import React from "react";
import { Route } from "react-router-dom";
import HomeList from "../Components/HomeList";
import ProfileList from "../Components/ProfileList";
import Search from "../Components/Search";
import NewSubject from "../Components/NewSubject";
import SubjectByNameList from "../Components/SubjectByNameList";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={HomeList} />
            <Route path="/Profile" component={ProfileList} />
            <Route path="/Subject" component={SubjectByNameList} />
            <Route path="/Search" component={Search} />
            <Route path="/NewSubject" component={NewSubject} />

        </React.Fragment>
    );}

export default ReactRouter;
