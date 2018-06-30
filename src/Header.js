import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MdSearch from "react-icons/lib/md/search";
import MdHome from "react-icons/lib/md/home";
import MdFace from "react-icons/lib/md/face";
import MdLogout from "react-icons/lib/io/log-out";
import {Redirect} from 'react-router-dom';



class Header extends Component {
    active = {
        backgroundColor: "#212F3D",
        color: "white",
        fontWeight: "bold",
    };
    header = {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-evenly"  
    };
    logout() {
        sessionStorage.setItem("userData", "");
        sessionStorage.clear();
      }

    render() {
        if(!sessionStorage.getItem('userData'))
            return (<Redirect to={'/'}/>);

        
        return (
            <div>
                <NavLink to="/Profile" activeStyle={this.active}>
                    <MdFace size={35} />
                </NavLink>
                <NavLink to="/Search" activeStyle={this.active}>
                    <MdSearch size={35} />
                </NavLink>
                <NavLink exact to="/Home" activeStyle={this.active}>
                     <MdHome size={35} />
                </NavLink>
                <NavLink to="#" onClick={this.logout} activeStyle={this.active}>
                     <MdLogout size={35} />
                </NavLink>  
                <div style={this.header}>       
                </div>
                <a href="/NewSubject" className="btn btn-primary newJem">New Jem</a>
            </div>
);}}
export default Header;