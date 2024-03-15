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
          <Route path="/LoginChoice" element={<LoginChoice />} />
          <Route path="/RegisterChoice" element={<RegisterChoice />} />
          <Route
            path="/login=Customer"
            element={<LoginForm user="Customer" />}
          />
          <Route path="/login=Agent" element={<LoginForm user="Agent" />} />
          <Route path="/register=Agent" element={<RegisterForm  />} />
          <Route path="/register=Customer" element={<RegisterForm  />} />
      
          {/* Protected routes */}
          <Route
            path={"/"}
            element={
              <RequireAuth fallbackPath={"/LoginChoice"}>
                <Home />
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
