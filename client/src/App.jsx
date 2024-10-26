import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Home, Profile, Login, Register } from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <NavigationRoutes />
      </Router>
    </>
  );
};

const NavigationRoutes = () => {
  const location = useLocation();
  const noNavigationPaths = ["/login", "/register"];
  return (
    <>
      {!noNavigationPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
