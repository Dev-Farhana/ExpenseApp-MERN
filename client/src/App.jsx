import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const navigate = useNavigate();

  useEffect(()=> {
    if(localStorage.getItem('user')){
      navigate("/")
    }
  },[navigate]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={ 
        <ProtectedRoutes> 
          <HomePage />
        </ProtectedRoutes> 
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes (props){
  if(localStorage.getItem('user')){
    return props.children
  } else{
    return <Navigate to="/login" />
  }
}

export default App;
