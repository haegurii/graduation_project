const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const port = 4000;
const app = express();
const server = http.createServer(app);

// 현재 룸에 들어간 사용자 확인하는 용도
let connectedUsers = [];
let rooms = [];


//ors정책회피
app.use(cors());
//json 형태 사용
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db 연결 완료");
  })
  .catch((err) => {
    console.log(err);
  });


//링크 라우팅 user로 오는건 라우터폴더의 유져로 보냄
app.use("/users", require("./routes/users"));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 발생하였습니다.");
  console.log(res.body);
});
//업로드 안에 파일에 접근가능하게 함 (절대경로)
app.use("/haha", express.static(path.join(__dirname, "../uploads")));

// 현재 룸이 존재하는지 확인하고 룸 상태정보를 받아오기
app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);

  if (room) {
    // send reponse that room exists
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true });
    } else {
      return res.send({ roomExists: true, full: false });
    }
  } else {
    // send response that room does not exists
    return res.send({ roomExists: false });
  }
});

// turn 서버에서 상태정보 받아오는 API
app.get("/api/get-turn-credentials", (req, res) => {
  const accountSid = "AC7cff1792ce0f8d410f4790a5048eeeb7";
  const authToken = "c9f5e65fe22c2e6764d5ca5530d4970c";

  const client = twilio(accountSid, authToken);

  res.send({ token: null });
  try {
    client.tokens.create().then((token) => {
      res.send({ token });
    });
  } catch (err) {
    console.log("error occurred when fetching turn server credentials");
    console.log(err);
    res.send({ token: null });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 클라이언트가 접속했을때 발생하는 이벤트
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  // 클라이언트가 새로운 방을 만들었을 때 발생
  socket.on("create-new-room", (data) => {
    console.log('socket.on(create-new-room)');
    createNewRoomHandler(data, socket);
  });

  // 클라이언트가 방에 참가 했을 때 발생
  socket.on("join-room", (data) => {
    console.log('socket.on(join-room)');

    joinRoomHandler(data, socket);
  });

  // 클라이언트가 연결을 종료했을 때 발생
  socket.on("disconnect", () => {
    console.log('socket.on(disconnect)');
    
    disconnectHandler(socket);
  });

  socket.on("conn-signal", (data) => {
    console.log('socket.on(conn-signal)');
    
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    console.log('socket.on(conn-init)');

    initializeConnectionHandler(data, socket);
  });

  socket.on("direct-message", (data) => {
    console.log('socket.on(direct-message)');

    directMessageHandler(data, socket);
  });
});

// socket.io handlers

const createNewRoomHandler = (data, socket) => {
  console.log("host is creating new room");
  console.log(data);
  const { identity, onlyAudio } = data;

  const roomId = uuidv4();

  // create new user
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };
  console.log(`createNewRoomHandler: newUser: ${newUser}`);

  // push that user to connectedUsers
  connectedUsers = [...connectedUsers, newUser];
  console.log(`createNewRoomHandler: connectedUsers: ${connectedUsers}`);

  //create new room
  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };
  console.log(`createNewRoomHandler: newRoom: ${newRoom}`);

  // join socket.io room
  socket.join(roomId);
  console.log(`createNewRoomHandler: socket.join(${roomId})`);


  rooms = [...rooms, newRoom];
  console.log(`createNewRoomHandler: rooms: ${rooms}`);

  // emit to that client which created that room roomId
  socket.emit("room-id", { roomId });
  console.log(`createNewRoomHandler: socket.emit("room-id", ${ roomId })`);

  // emit an event to all users connected
  // to that room about new users which are right in this room
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
  console.log(`createNewRoomHandler: socket.emit("room-update", { connectedUsers: ${newRoom.connectedUsers }})`);
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId, onlyAudio } = data;

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  };
  console.log(`joinRoomHandler: newUser: ${newUser}`);

  // join room as user which just is trying to join room passing room id
  const room = rooms.find((room) => room.id === roomId);
  console.log(`joinRoomHandler: room: ${room}`);
  room.connectedUsers = [...room.connectedUsers, newUser];
  console.log(`joinRoomHandler: room.connectedUsers: ${room.connectedUsers}`);


  // join socket.io room
  socket.join(roomId);
  console.log(`joinRoomHandler: socket.join(${roomId})`);

  // add new user to connected users array
  connectedUsers = [...connectedUsers, newUser];
  console.log(`joinRoomHandler: connectedUsers: ${connectedUsers}`);

  // emit to all users which are already in this room to prepare peer connection
  room.connectedUsers.forEach((user) => {
    if (user.socketId !== socket.id) {
      const data = {
        connUserSocketId: socket.id,
      };

      io.to(user.socketId).emit("conn-prepare", data);
      console.log(`joinRoomHandler: io.to(${user.socketId}).emit("conn-prepare", ${data})`);
    }
  });

  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
  console.log(`joinRoomHandler: io.to(${roomId}).emit("room-update", { connectedUsers: ${room.connectedUsers} })`);
};

const disconnectHandler = (socket) => {
  // find if user has been registered - if yes remove him from room and connected users array
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  console.log(`disconnectHandler: user: ${user}`);

  if (user) {
    // remove user from room in server
    const room = rooms.find((room) => room.id === user.roomId);
    console.log(`disconnectHandler: room: ${room}`);

    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );
    console.log(`disconnectHandler: room.connectedUsers: ${room.connectedUsers}`);

    // leave socket io room
    socket.leave(user.roomId);
    console.log(`disconnectHandler: socket.leave(${user.roomId})`);

    // close the room if amount of the users which will stay in room will be 0
    if (room.connectedUsers.length > 0) {
      // emit to all users which are still in the room that user disconnected
      io.to(room.id).emit("user-disconnected", { socketId: socket.id });
      console.log(`disconnectHandler: io.to(${room.id}).emit("user-disconnected", { socketId: ${socket.id} })`);

      // emit an event to rest of the users which left in the toom new connectedUsers in room
      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
      console.log(`disconnectHandler: io.to(${room.id}).emit("room-update", {connectedUsers: ${room.connectedUsers}})`);
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
      console.log(`disconnectHandler: rooms: ${rooms}`);
    }
  }
};

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  console.log(`signalingHandler: signalingData: ${signalingData}`);

  io.to(connUserSocketId).emit("conn-signal", signalingData);
  console.log(`signalingHandler: io.to(${connUserSocketId}).emit("conn-signal", ${signalingData})`);
};

// information from clients which are already in room that They have preapred for incoming connection
const initializeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data;

  const initData = { connUserSocketId: socket.id };
  console.log(`initializeConnectionHandler: initData: ${initData}`);

  io.to(connUserSocketId).emit("conn-init", initData);
  console.log(`initializeConnectionHandler: io.to(${connUserSocketId}).emit("conn-init", ${initData})`);
};

const directMessageHandler = (data, socket) => {
  if (
    connectedUsers.find(
      (connUser) => connUser.socketId === data.receiverSocketId
    )
  ) {
    const receiverData = {
      authorSocketId: socket.id,
      messageContent: data.messageContent,
      isAuthor: false,
      identity: data.identity,
    };
    console.log(`directMessageHandler: receiverData: ${receiverData}`);
    
    socket.to(data.receiverSocketId).emit("direct-message", receiverData);
    console.log(`directMessageHandler: socket.to(${data.receiverSocketId}).emit("direct-message", ${receiverData})`)

    const authorData = {
      receiverSocketId: data.receiverSocketId,
      messageContent: data.messageContent,
      isAuthor: true,
      identity: data.identity,
    };
    console.log(`directMessageHandler: authorData: ${authorData}`);

    socket.emit("direct-message", authorData);
    console.log(`directMessageHandler: socket.emit("direct-message", ${authorData})`);
  }
};

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다.`);
});
