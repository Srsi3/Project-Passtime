import React from "react";
import { BrowserRouter } from "react-router-dom";
import Quote from "./Quote"; // Import the Quote component
import LoginPage from "./login_page";
import StudentRequest from "./studentrequest";
import { theme } from "./theme";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./create_account_page";
import HomePage from "./home_page";

export default function App() {
    return (
      <MantineProvider theme={theme}>
        <Router>
          <Routes>
            
            <Route path="/Login" element={<LoginPage/>} />
            <Route path="/createaccount" element={<CreateAccount/>} />
            <Route path="/studentrequest" element={<StudentRequest/>} />
            <Route path="/home" element={<HomePage/>} />
  
          </Routes>
        </Router>
      </MantineProvider>
    );
  }