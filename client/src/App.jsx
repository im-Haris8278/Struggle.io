import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import {
  HomePage,
  LoginPage,
  RoadmapPage,
  SignUpPage,
  TaskPage,
  RequestPage,
  ProfilePage,
} from "./Routes/Routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/roadmaps" element={<RoadmapPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/dashboard" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
