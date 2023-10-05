import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header"; // 헤더 컴포넌트
import Homepage from "./components/Homepage"; // 홈 페이지 컴포넌트
import Teampage from "./components/Teampage"; // 팀 페이지 컴포넌트
import Callpage from "./components/Callpage"; // 홈 페이지 컴포넌트
import Studypage from "./components/Studypage";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header /> {/*헤더는 모든 부분에 나와야하니 그다음을 switch로 감싸줌*/}
        <Routes>
          <Route path="/" element={<Homepage />} />{" "}
          {/* Homepage 컴포넌트를 이렇게 렌더링 */}
          <Route path="/Teampage" element={<Teampage />} />{" "}
          {/* Homepage 컴`포넌트를 이렇게 렌더링 */}
          <Route path="/Callpage" element={<Callpage />} />{" "}
          {/* Homepage 컴포넌트를 이렇게 렌더링 */}
          <Route path="/Studypage" element={<Studypage />} />{" "}
          {/* Homepage 컴포넌트를 이렇게 렌더링 */}
          <Route path="/signup" element={<SignupForm />} />{" "}
          {/* SignupForm 컴포넌트 연결 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
