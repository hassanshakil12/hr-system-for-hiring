import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Feed,
  Dashboard,
  Search,
  Profile,
  Settings,
  Login,
  Register,
} from "./pages";
import { Navbar, SearchBar, ProfileCard } from "./components";

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
    <div className="app">
      {!noNavigationPaths.includes(location.pathname) && <Navbar />}
      <div className="app-layout">
        <div className="app-header">
          <SearchBar />
          <ProfileCard />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
