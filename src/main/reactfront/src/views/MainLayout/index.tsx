import { useEffect, useState } from "react";
import Navigation from "../Navigation";
import Athentication from "../Authentication";
import BoardMain from "../BoardMain/index";
import { useUserStore } from "../../stores";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function MainLayout() {
  const [boardResponse, setBoardResponse] = useState<string>("");
  const [cookies] = useCookies();
  const { user } = useUserStore();

  const getBoard = async (token: string) => {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios
      .get("http://localhost:8080/api/board/", requestOption)
      .then((response) => {
        console.log(response);
        setBoardResponse(response.data);
      })
      .catch((error) => "");
  };
  useEffect(() => {
    const token = cookies.token;
    if (token) {
      getBoard(token);
    } else setBoardResponse("");
  }, [cookies.token]);

  return (
    <>
      <Navigation />
      {boardResponse ? <BoardMain /> : <Athentication />}
    </>
  );
}
