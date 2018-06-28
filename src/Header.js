import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MdSearch from "react-icons/lib/md/search";
import MdHome from "react-icons/lib/md/home";
import MdFace from "react-icons/lib/md/face";

class Header extends Component {
    active = {
        backgroundColor: "#212F3D",
        color: "white",
        fontWeight: "bold"
    };
    header = {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly"
    };

    render() {
        return (
            <div>
                <NavLink to="/Profile" activeStyle={this.active}>
                    <MdFace size={35} />
                </NavLink>
                <NavLink to="/Search" activeStyle={this.active}>
                    <MdSearch size={35} />
                </NavLink>
                <NavLink exact to="/" activeStyle={this.active}>
                     <MdHome size={35} />
                </NavLink> 
                <div style={this.header}>       
                </div>
                <a href="/NewSubject" className="btn btn-primary newJem">New Jem</a>
            </div>
);}}
export default Header;