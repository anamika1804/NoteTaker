import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const token = localStorage.getItem("token");

        axios({
            url: `http://127.0.0.1:8000/users/logout`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async () => {
            const isTokenExists = await localStorage.getItem("token");
            if (isTokenExists) {
                localStorage.removeItem("token");
                navigate("/");
            }
        });
    };

    const handleDeleteAcc = () => {
        const token = localStorage.getItem("token");

        axios({
            url: `http://127.0.0.1:8000/users/delete`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            console.log("User Account deleted");
            localStorage.removeItem("token");
            navigate("/");
        });
    };

    return (
        <div className="Navbar">
            <div className="NavTitle">
                <Link className="NavTitle" to="/dashboard">
                    <h1 className="Titletext">Notes App</h1>
                </Link>
            </div>
            <div className="NavRouters">
                <Link className="NavRouters routes" to="/search">
                    <span className="routes">Search</span>
                </Link>
            </div>
            <div className="NavBtns">
                <button className="CreateNote" onClick={handleSignOut}>
                    Sign Out
                </button>
                <button
                    className="CreateNote DelAccountBtn"
                    onClick={handleDeleteAcc}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Navbar;
