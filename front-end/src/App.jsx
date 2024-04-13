import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Stat from "./pages/Stat";
import Profile_Page from "./pages/Profile_Page";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../src/hooks/useAuthContext";
import HomeChef from "./pages/HomeChef";

function App() {
  const { user } = useAuthContext();

  return (
    <Routes>
      {/* Route for the root path */}
      <Route
        path="/"
        element={user ? (user.role === 'Chef' ? <HomeChef /> : <Home />) : <Navigate to="/Login" />}
      />
      {/* Route for the /Stat path */}
      <Route path="/Stat" element={<Stat />} />
      {/* Route for the /Profile path */}
      <Route path="/Profile" element={<Profile_Page />} />
      {/* Route for the /Login path */}
      <Route path="/Login" element={!user ? <Login /> : <Navigate to="/" />} />
      {/* Route for the /SignUp path */}
      <Route path="/SignUp" element={!user ? <SignUp /> : <Navigate to="/" />} />
      {/* Route for the /chef path */}
      <Route path="/chef" element={user && user.role === 'Chef' ? <HomeChef /> : <Navigate to="/Login" />} />
    </Routes>
  );
}

export default App;
