const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = 4000;

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
app.use("/signlanguages", require("./routes/signLanguages"));
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 발생하였습니다.");
  console.log(res.body);
});
//업로드 안에 파일에 접근가능하게 함 (절대경로)
app.use("/haha", express.static(path.join(__dirname, "../uploads")));
app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다.`);
});
