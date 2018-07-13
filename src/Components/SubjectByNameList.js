import React, {Component} from 'react'
import SubjectByName from './SubjectByName'
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';
import {GetData} from '../services/GetData';
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import { NavLink } from "react-router-dom";
// import { Route } from "react-router-dom";
//TODO: do the join(by removing the segment of notRefresh)
import { NavLink } from "react-router-dom";



class SubjectByNameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
      ],
      redirect: false,
      loginError:false,
      errorMsg:"",
      joinSubject:false
    }

    this.flagNotification = true;
    this.eachSubject    = this.eachSubject.bind(this);
    this.update         = this.update.bind(this);
    this.add            = this.add.bind(this)
    this.nextID         = this.nextID.bind(this)
    this.doPostData     = this.doPostData.bind(this);
    this.doGetData      = this.doGetData.bind(this);
    this.notificationsFollowing  = this.notificationsFollowing.bind(this);
    
  }

  add(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8,txt9) {
    this.setState(prevState => ({
      subjects: [
      ...prevState.subjects,
      {
          id: this.nextID(),
          name: txt1,
          date: txt2,
          hours: txt3,
          type: txt4,
          location: txt5,
          about: txt6,
          price: txt7,
          requredSkills: txt8,
          background: txt9
          
      }]
    }))
  }
  nextID() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

 componentDidMount() {   
    //TODO: check the potencial bug og sub.name 
    //that haveas least 2 words.(can't do toString)

    //----------------------------------------------
    let subName=this.props.location.subName;
    console.log("*****************")
    this.doPostData(subName,'followSubject/');
    this.doGetData(subName,'getSubjectByName/');  
  }



  doGetData(subName,route) {
    let getData = {
      name: subName
    }

    if (getData) {
      getData.name=getData.name.replace(/ /g, "%20");
      GetData(route,getData.name).then((result) => {
        if((result!=false)){
          var self=this;        
          self.add(result.name, result.date, result.hours, result.type,
            result.location, result.about, result.price, result.requredSkills, result.background);                
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"Subject not found."});
          console.log(this.state.errorMsg);
        }
      });
    } else {}
}

  update(newSub, i) {
    this.setState(() => ({
      subjects: this.state.subjects.map(
        (sub) => (sub.id !== i) ? sub : {...sub, name: newSub}
      )
    }))
  }    

  //TODO: change it to one subject and not a arry of(remove map..)
  eachSubject (sub,i) {
    const imageUrl = require(`../images/${sub.background}`)
    return (          
      <div key={'container'+i} className="myCard backgroundBlack" style={{width: `18rem`,borderRadius: `2px` }}>
          <SubjectByName key={'sub'+i} index={i} onChange={this.update}>
          <div style={{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat'}}>         
            <h1 className="card-title">{sub.name}</h1>
            <p className="card-text">{sub.date} ● {sub.hours}</p>
   
             <NavLink to=
                        //navigate to SubjectByName with the param sub.name
                        {{pathname: "/Home", 
                          isJoined: true,
                          subName:sub.name}}
                          activeStyle={this.active} 
            className="btn btn-primary followSub" >Join</NavLink>
          </div>
          <div>
            <p className="card-text textCenter paddinTop5 marginTop20">{sub.about}</p>
          </div>
          <div className="paddinTop5 marginTop20">
            <p className="card-text"><FaClockO/>&nbsp;{sub.date} ● {sub.hours}</p>
            <p className="card-text"><FaLocationArrow/>&nbsp;{sub.location}</p>
            <p className="card-text">{sub.type}</p>
            <p className="card-text">{sub.price} ₪</p>
            <p className="card-text">{sub.requredSkills}</p>
            <p className="card-text">{sub.participent}</p>
          </div>
          </SubjectByName>
    
      </div>
      )
  }

  doPostData (subName,route) {
    
    let postData = {
      userName: JSON.parse(sessionStorage.getItem('userData')).userName,
      name: subName
    }
    //Q: why not in a metter of sucssess?
    this.notificationsFollowing();
    PostData(route, postData).then((result) => {
      if((result!=false)){
        this.setState({redirect: true});
      }
      else{
        this.setState({loginError:true});
        this.setState({errorMsg:"User is NOT exist, please try again."});
        console.log(this.state.errorMsg);
      }
    });
    
  }
  
  notificationsFollowing(){
    console.log("flagNotification: " + this.flagNotification);
    if(this.flagNotification){
      NotificationManager.success('Success message', 'Yeahy! now you are following:)');  
      this.flagNotification = false;
    }
  }

  render() {
    if(!sessionStorage.getItem('userData'))
      return (<Redirect to={'/'}/>);
    return (
        <div >
          <NotificationContainer/>
          {this.state.subjects.map(this.eachSubject)}
        </div>
      )
  }
}
export default SubjectByNameList
