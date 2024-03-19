import Header from "./components/Header/Header";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Maintable from "./components/Maintable/Maintable";
import NavB from "./components/NavB/NavB";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Stat from "./pages/Stat";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="Stat" element={<Stat />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="Login" element={<Login />} />
      <Route path="SignUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
