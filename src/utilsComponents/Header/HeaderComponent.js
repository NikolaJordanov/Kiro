import { Component } from "react";
import ".//HeaderComponent.css"
import { Outlet, Link } from "react-router-dom";
import UserComponent from "./user/userComponent";

// functionality to be added
function HeaderComponent() {
    return (
        <header className="header_grid">
            <div>
                <Link to="/Home">Home</Link>
                <Link to="/FindABuddy">Find a buddy</Link>
                <Link to="/Posts">Posts</Link>
            </div>
            <div>
                <Link to="/About us">About us</Link>
                <Link to="/Contact us">Contact us</Link>
                <i className="line"></i> 

                <UserComponent></UserComponent>
            </div>
        </header>
    );
  }
  
export default HeaderComponent;