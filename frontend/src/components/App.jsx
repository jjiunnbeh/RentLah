import LoginChoice from "./LoginChoice";
import RegisterChoice from "./RegisterChoice";
import Footer from "./Footer";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "../styles/App.css";
import LoginForm from "./LoginForm";
import Home from "../pages/Home";
import RegisterForm from '../pages/RegisterForm';
import "bootstrap/dist/css/bootstrap.min.css";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import LoginPage from "../pages/LoginPage";
import ProfileForm from "./ProfileForm";
import ChangePassword from "../pages/ChangePassword";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

function App() {
  return (
    <AuthProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginChoice />} />
          <Route path="/register" element={<RegisterChoice />} />

          <Route path="/login/customer" element={<LoginForm userType="customer" />} />
         <Route path="/login/agent" element={<LoginForm userType="agent" />} />
          <Route path="/register/agent" element={<RegisterForm userType="agent" />} />
          <Route path="/register/customer" element={<RegisterForm userType="customer"  />} />

      
          {/* Protected routes */}
          <Route
            path={"/"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path={"/change-password/Agent"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ChangePassword userType="agent"/>
              </RequireAuth>
            }
          />
          <Route
            path={"/change-password/Customer"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ChangePassword userType="customer"/>
              </RequireAuth>
            }
          />


            <Route
            path={"/profile"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ProfileForm />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
