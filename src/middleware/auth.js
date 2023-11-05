//토큰이 올바른지 검사

const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
  //토큰을 리퀘스트 헤더에서 가져오기
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return res.status(400).send("없는 유저입니다.");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = auth;
