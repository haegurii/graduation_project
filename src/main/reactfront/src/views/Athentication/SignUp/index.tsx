import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function SignUp() {
  const [requestResult, setRequestResult] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const sighUpHandler = () => {
    const data = {
      username,
      password,
      passwordCheck,
      email,
      role,
      birthDate,
    };
    axios
      .post("http://localhost:8080/api/auth/signUp", data)
      .then((response) => {})
      .catch((error) => {});
  };

  return (
    <Box>
      <Card sx={{ minWidth: 275, maxWidth: "50vw" }}>
        <CardContent>
          <Box>
            <TextField
              fullWidth
              label="이메일"
              variant="standard"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="비밀번호"
              variant="standard"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="비밀번호확인"
              variant="standard"
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <TextField
              fullWidth
              label="닉네임"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="농인"
              variant="standard"
              onChange={(e) => setRole(e.target.value)}
            />
            <TextField
              fullWidth
              label="생년월일"
              variant="standard"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              sighUpHandler();
            }}
          >
            회원 가입
          </Button>
        </CardActions>
      </Card>
      <h3>{requestResult}</h3>
    </Box>
  );
}
