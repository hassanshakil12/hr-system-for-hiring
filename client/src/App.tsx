import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Archeive from "./pages/Archeive";
// import ScrollToTop from "./components/common/ScrollToTop";
import OrganizationDashboard from "./pages/Dashboard/OrganizationDashboard";
import RecruiterDashboard from "./pages/Dashboard/RecruiterDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import OrganizationLayout from "./layout/OrganizationLayout";
import RecruiterLayout from "./layout/RecruiterLayout";
import UserLayout from "./layout/UserLayout";
import AddAppointments from "./pages/AddAppointments";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import ArcheiveUser from "./pages/ArcheiveUser";
import ArcheiveRec from "./pages/ArcheiveRec";
import AdminNotifications from "./components/AdminNotifications";
import Appointments from "./pages/Appointments";
import Employees from "./pages/Employees";
import AppointmentsEmp from "./pages/AppointmentsEmp";
import AppointmentsRec from "./pages/AppointmentsRec";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* -------- Organization Routes -------- */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["organization"]}>
              <OrganizationLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/organization-dashboard"
            element={<OrganizationDashboard />}
          />
          <Route path="/applications" element={<Appointments />} />
          <Route path="/create-job" element={<AddAppointments />} />
          <Route path="/recruiters" element={<Employees />} />
          <Route path="/accepted-requests" element={<Archeive />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/notification-admin" element={<AdminNotifications />} />
        </Route>

        {/* -------- Recruiter Routes -------- */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter-applications" element={<AppointmentsRec />} />
          <Route path="/recruiter-requests" element={<ArcheiveRec />} />
          <Route path="/recruiter-profile" element={<Profile />} />
          <Route path="/recruiter-settings" element={<Settings />} />
          <Route path="/recruiter-logout" element={<Logout />} />
        </Route>

        {/* -------- Candidate Routes -------- */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/candidate-dashboard" element={<UserDashboard />} />
          <Route path="/candidate-applications" element={<AppointmentsEmp />} />
          <Route path="/jobs" element={<ArcheiveUser />} />
          <Route path="/candidate-profile" element={<Profile />} />
          <Route path="/candidate-settings" element={<Settings />} />
          <Route path="/candidate-logout" element={<Logout />} />
        </Route>

        {/* -------- Public Auth Routes -------- */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* -------- Fallback 404 -------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
