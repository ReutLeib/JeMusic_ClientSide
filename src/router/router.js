import React from "react";
import { Route } from "react-router-dom";
import SubjectList from "../Components/SubjectList";
import ProfileList from "../Components/ProfileList";
import SubjectByNameList from "../Components/SubjectByNameList";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={SubjectList} />
            <Route exact path="/Profile" component={ProfileList} />
            <Route exact path="/Subject" component={SubjectByNameList} />

        </React.Fragment>
    );}

export default ReactRouter;
