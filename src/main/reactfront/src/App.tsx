import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header"; // 헤더 컴포넌트
import Homepage from "./components/Homepage"; // 홈 페이지 컴포넌트
import Teampage from "./components/Teampage"; // 팀 페이지 컴포넌트
import Callpage from "./components/Callpage"; // 홈 페이지 컴포넌트
import Studypage from "./components/Studypage";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import MainLayout from "./views/MainLayout";
function App() {
  return <MainLayout />;
}

export default App;
