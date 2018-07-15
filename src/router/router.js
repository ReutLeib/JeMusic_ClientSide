import React from "react";
import { Route } from "react-router-dom";
import HomeList from "../Components/HomeList";
import ProfileList from "../Components/ProfileList";
import Search from "../Components/Search";
import NewSubject from "../Components/NewSubject";
import SubjectByNameList from "../Components/SubjectByNameList";
import Welcome from "../Components/Welcome";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
            <Header />
                <Route exact path={`/2017-2018/dcs/dev_179/`} component={Welcome} />
                <Route exact path={`/2017-2018/dcs/dev_179/Home`} component={HomeList} />
                <Route path={`/2017-2018/dcs/dev_179/Profile`} component={ProfileList} />
                <Route path={`/2017-2018/dcs/dev_179/Subject`} component={SubjectByNameList} />
                <Route path={`/2017-2018/dcs/dev_179/Search`} component={Search} />
                <Route path={`/2017-2018/dcs/dev_179/NewSubject`} component={NewSubject} />
        </React.Fragment>
    );}

export default ReactRouter;
