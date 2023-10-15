import React, { useState } from "react";
import { Box, TextField, Card, Button, Typography } from "@mui/material";
import { signUpApi } from "../../../apis";

interface Props {
  setAuthView: (authView: boolean) => void;
}
export default function SignUp(props: Props) {
  const { setAuthView } = props;

  // const [requestResult, setRequestResult] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const sighUpHandler = async () => {
    const data = {
      username,
      password,
      passwordCheck,
      email,
      role,
      birthDate,
    };

    const signUpResponse = await signUpApi(data);

    if (!signUpResponse) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    if (!signUpResponse.result) {
      alert("회원가입에 실패했습니다.");
      return;
    }
    alert("회원가입에 성공했습니다.");
    setAuthView(false);
  };
  return (
    <Card sx={{ minWidth: 275, maxWidth: "50vw", padding: 5 }}>
      <Box>
        <Typography variant="h5">회원가입</Typography>
      </Box>
      <Box height={"50vh"}>
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

      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          sighUpHandler();
        }}
      >
        회원 가입
      </Button>
      <Box component={"div"} display={"flex"} mt={2}>
        <Typography>이미 계정이 있으신가요?</Typography>
        <Typography fontWeight={800} ml={1} onClick={() => setAuthView(false)}>
          로그인
        </Typography>
      </Box>
    </Card>
  );
}
