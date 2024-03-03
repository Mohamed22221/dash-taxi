import React from "react";
import { Navigate } from "react-router-dom";

//pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import Home from "../custom pages/Home/home";
import { Blogs } from "../custom pages/Blogs";
import { Seo } from "../custom pages/Seo";
import { SocialURLS } from "../custom pages/SocialUrls";
import { Integration } from "../custom pages/Integration";
import { ClientRequest } from "../custom pages/CRM/ClientRequest";
import { ClientSubscription } from "../custom pages/CRM/ClientSubscription";
import PrivacyPolicy from "../custom pages/policy/PrivacyPolicy";

const authProtectedRoutes = [
  { path: "/blogs", component: <Blogs /> },
  { path: "/dashboard", component: <Home /> },
  { path: "/social-url", component: <SocialURLS /> },
  { path: "/general", component: <Seo /> },
  { path: "/integration", component: <Integration /> },
  { path: "/client-request", component: <ClientRequest /> },
  { path: "/client-subscription", component: <ClientSubscription /> },
  { path: "/privacy-policy", component: <PrivacyPolicy /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  // { path: "/forgot-password", component: <CoverPasswReset /> },
  { path: "/register", component: <CoverSignUp /> },
];

export { authProtectedRoutes, publicRoutes };
