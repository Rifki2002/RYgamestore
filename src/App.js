import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ManageData from "./pages/ManageData";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LayoutDashboard from "./layout/LayoutAdmin";
import LayoutClient from "./layout/LayoutClient";

const App = () => {
  const LoginRoute = (props) => {
    if (Cookies.get("token") === undefined) {
      return <Navigate to={"/onlyAdmin"} />;
    } else if (Cookies.get("token") !== undefined) {
      return props.children;
    }
  };

  //Ketika sudah login tidak bisa masuk ke halaman login kembali
  const LoginRoute2 = (props) => {
    if (Cookies.get("token") !== undefined) {
      return <Navigate to={"/"} />;
    } else if (Cookies.get("token") === undefined) {
      return props.children;
    }
  };

  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
          <Route
            path="/login"
            element={
              <LayoutClient>
                <LoginRoute2>
                  <Login />
                </LoginRoute2>
              </LayoutClient>
                
            }
          />

          <Route
            path="/register"
            element={
              <LayoutClient>
                <Register />
              </LayoutClient>
                
            }
          />

<Route
            path="/dashboard"
            element={
              <LayoutDashboard>
                <LoginRoute>
                  <ManageData />
                </LoginRoute>
              </LayoutDashboard>
            }
          />
          
            <Route path="/" element={
              <LayoutClient>
                <Home />
                </LayoutClient>
            
            } />

            <Route path="/manage-data" element={<ManageData />} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
