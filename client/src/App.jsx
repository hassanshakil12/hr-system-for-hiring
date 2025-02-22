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
  Applications,
  ApplyToJob,
  MyJobs,
  CreateJob,
  ApplicationHub,
  HireRecruiter,
  RecruitersCard,
} from "./pages";
import {
  Navbar,
  SearchBar,
  ProfileCard,
  ProtectedRoutes,
  RestrictedRoutes,
} from "./components";
import UserContextProvider from "./context/UserContextProvider.jsx";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <NavigationRoutes />
      </Router>
    </UserContextProvider>
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
          {!noNavigationPaths.includes(location.pathname) && <SearchBar />}
          {!noNavigationPaths.includes(location.pathname) && <ProfileCard />}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoutes>
                <Feed />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoutes>
                <Applications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Search"
            element={
              <ProtectedRoutes>
                <Search />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Apply-to-job/:job"
            element={
              <ProtectedRoutes>
                <ApplyToJob />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <ProtectedRoutes>
                <MyJobs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/create-job"
            element={
              <ProtectedRoutes>
                <CreateJob />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/application-hub"
            element={
              <ProtectedRoutes>
                <ApplicationHub />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/recruiters"
            element={
              <ProtectedRoutes>
                <HireRecruiter />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/hire-recruiter/:recruiterId"
            element={
              <ProtectedRoutes>
                <RecruitersCard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoutes>
                <Login />
              </RestrictedRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoutes>
                <Register />
              </RestrictedRoutes>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
