import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./layouts/Dashboard";
import Login from "./layouts/User/Login";

const App = () => {
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Dashboard/Login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    );
  };
  
  export default App;