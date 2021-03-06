/*  -----------------------------------------------------------
    ----------------------------------------------------------- 
    copyrights reserve to Reut Leib && Tal Chausho Gur-Arie
    ----------------------------------------------------------- 
    ----------------------------------------------------------- 
    */

import React, { Component } from "react";
import { NavLink , Link} from "react-router-dom";
import MdSearch from "react-icons/lib/md/search";
import MdHome from "react-icons/lib/md/home";
import MdFace from "react-icons/lib/md/face";
import MdLogout from "react-icons/lib/io/log-out";
import {Redirect} from 'react-router-dom';

class Header extends Component {
    active = {
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
            return (<Redirect to={`/`}/>);

        
        return (
            <div className="container">
                <div className="col-xs-12 col-md-6 offset-md-3">
                    <NavLink to={`/Profile`} activeStyle={this.active} className="col-xs-12 col-md-6 offset-md-3 svgHover">
                        <MdFace size={35} />
                    </NavLink>
                    <NavLink to={`/Search`} activeStyle={this.active} className="col-xs-12 col-md-6 svgHover">
                        <MdSearch size={35} />
                    </NavLink>
                    <NavLink exact to={`/Home`} activeStyle={this.active} className="col-xs-12 col-md-6 svgHover">
                         <MdHome size={35} />
                    </NavLink>
                    <NavLink to={`/#`} onClick={this.logout} activeStyle={this.active} className="col-xs-12 col-md-6 svgHover">
                         <MdLogout size={35} />
                    </NavLink>  
                    <div style={this.header}>       
                    </div>
                    <Link to={`/NewSubject`} className="btn btn-primary newJem removeHover">New Jem</Link>
                </div>
            </div>
);}}
export default Header;