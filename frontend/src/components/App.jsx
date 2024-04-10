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
import ListingDetails from "../pages/ListingDetails";
import ForgetPassword from "./ForgetPasword";
import CreateListingForm from "./CreateListingForm";
import ResetPassword from "./ResetPassword";
import SearchResults from "../pages/SearchResults";
import Watchlist from "./Watchlist";
import EditListing from "./EditListing";


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
          <Route path="/forget-pass/customer" element={<ForgetPassword userType="customer"  />} />

          <Route path="/forget-pass/agent" element={<ForgetPassword userType="agent"  />} />

          <Route path="/reset-pass/customer/:id/:token" element={<ResetPassword userType="customer"  />} />
          
          <Route path="/reset-pass/agent/:id/:token" element={<ResetPassword userType="agent"  />} />


      
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
            path={"/change-password/agent"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ChangePassword userType="agent"/>
              </RequireAuth>
            }
          />
          <Route
            path={"/change-password/customer"}
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


            <Route
            path={"/createlisting"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <CreateListingForm />
              </RequireAuth>
            }
          />
            <Route
            path={"/listing/:id"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <ListingDetails />
              </RequireAuth>
            }
          />

          <Route
            path={"/search/:searchTerm/:bedroom/:bathroom/:lowerPrice/:upperPrice"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <SearchResults/>
              </RequireAuth>
            }
          />
          <Route
            path={"/search/:searchTerm"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <SearchResults />
              </RequireAuth>
            }
          />

          <Route
            path={"/Watchlist"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <Watchlist />
              </RequireAuth>
            }
          />

          <Route
            path={"/EditListing"}
            element={
              <RequireAuth fallbackPath={"/login"}>
                <EditListing />
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
