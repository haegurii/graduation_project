import React, { useState } from "react";
import SignUp from "./SignUp";
import { Box } from "@mui/material";
import SignIn from "./SignIn/index";

export default function Authentication() {
  //authView : true - signUp, false - signIn
  const [authView, setAuthView] = useState<boolean>(true);
  return (
    <Box display="flex" height="100vh">
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
      ></Box>
      <Box display="flex" flex={1} justifyContent="center" alignItems="center">
        {authView ? (
          <SignUp setAuthView={setAuthView} />
        ) : (
          <SignIn setAuthView={setAuthView} />
        )}
      </Box>
    </Box>
  );
}
