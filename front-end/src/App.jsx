import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Stat from "./pages/Stat";
import Profile_Page from "./pages/Profile_Page";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../src/hooks/useAuthContext";
import AddTaks from "./components/AddTask/AddTasks";
function App() {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />} />
      <Route path="Stat" element={<Stat />} />
      <Route path="Profile" element={<Profile_Page />} />
      <Route path="Login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="SignUp" element={!user ? <SignUp /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
