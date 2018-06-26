import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MdSearch from "react-icons/lib/md/search";

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
                <NavLink to="/Search" activeStyle={this.active}>
                    <MdSearch size={35} />
                </NavLink>
                <div style={this.header}>
                    <NavLink exact to="/" activeStyle={this.active}>
                    Home
                    </NavLink>
                    <NavLink to="/Subject" activeStyle={this.active}>
                    Subject
                    </NavLink>
                    <NavLink to="/Profile" activeStyle={this.active}>
                    Profile
                    </NavLink>
                </div>
                <a href="#" className="btn btn-primary newJem">New Jem</a>
            </div>
);}}
export default Header;