import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";    // npm i -D react-router-dom

import Home from './Home/Home';
import PageUnavailable from "./utilsComponents/PageUnavailable/PageUnavailable.js"
import AboutContact from './AboutContact/AboutContact.js';
import SigninForum from './AccountManagement/Forum/SignInForum.js';
import RegisterForum from './AccountManagement/Forum/RegisterForum.js';
import ".//styles.css"


//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <Home></Home>
//  </React.StrictMode>
//);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route index path="/Home" element={<Home />} />
        <Route path="/Contact us" element={<AboutContact />} />
        <Route path="/About us" element={<AboutContact />} />
        <Route path="/Sign in" element={<SigninForum />} />
        <Route path="/Register" element={<RegisterForum />} />
        <Route path="*" element={<PageUnavailable />} />
      </Routes>
    </BrowserRouter>
);

////<Route path="/Forum" element={<SigninForum />} />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals