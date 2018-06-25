import React from "react";
import { Route } from "react-router-dom";
import HomeList from "../Components/HomeList";
import ProfileList from "../Components/ProfileList";
import SubjectByNameList from "../Components/SubjectByNameList";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={HomeList} />
            <Route exact path="/Profile" component={ProfileList} />
            <Route exact path="/Subject" component={SubjectByNameList} />

        </React.Fragment>
    );}

export default ReactRouter;
