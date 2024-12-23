import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import PrivateRouter from "./PrivateRouter";
import SideBarDrawer from "../layout/SideBar";
import Profile from "../pages/profile/Profile";
import MainDashboard from '../pages/dashboard/UserView'
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import SubAdminDashboard from "../pages/dashboard/SubAdminDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";
import AccessDenied from "../components/AccessDenied";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Protected Routes */}
        <Route element={<PrivateRouter allowedRoles={["User", "Admin","Sub-Admin"]} />}>
          <Route path="dashboard" element={<SideBarDrawer />}>
            <Route index element={<MainDashboard />} />
            <Route
              path="/dashboard/profile"
              element={<Profile />}
            />
            <Route
              path="/dashboard/user"
              element={<UserDashboard />}
            />
          </Route>
        </Route>

        <Route element={<PrivateRouter allowedRoles={["Admin"]} />}>
        <Route path="dashboard" element={<SideBarDrawer />}>
          <Route
            path="/dashboard/admin-dashboard"
            element={<AdminDashboard />}
          />
        </Route>
        </Route>
        
        <Route element={<PrivateRouter allowedRoles={["Sub-Admin"]} />}>
        <Route path="dashboard" element={<SideBarDrawer />}>
          <Route
            path="/dashboard/sub-dashboard"
            element={<SubAdminDashboard />}
          />
        </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
