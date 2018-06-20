import React from "react";
import { Route } from "react-router-dom";
import SubjectList from "../Components/SubjectList";
import MyIdeas from "../Components/MyIdeas";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={SubjectList} />
            <Route path="/MyIdeas" component={MyIdeas} />
        </React.Fragment>
    );}

export default ReactRouter;
