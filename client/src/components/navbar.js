import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {authContext} from "../context/authContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(authContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }
    return (
        <nav>
            <div className="nav-wrapper pink darken-4">
                <NavLink to="/" className="brand-logo" style={{marginLeft: 20}}>ShortLinker</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create" >Short my link</NavLink></li>
                    <li><NavLink to="/userLinks" >My links</NavLink></li>
                    <li><a href="/"  onClick={logoutHandler}>Log out</a></li>

                </ul>
            </div>
        </nav>
    )
}