import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MdSearch from "react-icons/lib/md/search";
import MdHome from "react-icons/lib/md/home";

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
                    Profile
                </NavLink>
                <NavLink to="/Search" activeStyle={this.active}>
                    <MdSearch size={35} />
                </NavLink>
                <NavLink exact to="/" activeStyle={this.active}>
                     <MdHome size={35} />
                </NavLink> 
                <div style={this.header}> 
                <NavLink exact to="/NewSubject" activeStyle={this.active}>
                     newSubject
                </NavLink>          
                </div>
                <a href="#" className="btn btn-primary newJem">New Jem</a>
            </div>
);}}
export default Header;