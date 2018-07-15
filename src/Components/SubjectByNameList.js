import React, {Component} from 'react'
import SubjectByName from './SubjectByName'
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';
import {GetData} from '../services/GetData';
import FaClockO from 'react-icons/lib/fa/clock-o';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';
import 'react-notifications/lib/notifications.css';
import Iframe from 'react-iframe'
import Video from './Video'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { NavLink } from "react-router-dom";
import './style.css';

class SubjectByNameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
      ],
      redirect: false,
      loginError:false,
      errorMsg:"",
    }

    this.flagNotification = true;
    this.eachSubject    = this.eachSubject.bind(this);
    this.update         = this.update.bind(this);
    this.add            = this.add.bind(this)
    this.nextID         = this.nextID.bind(this)
    this.doPostData     = this.doPostData.bind(this);
    this.doGetData      = this.doGetData.bind(this);
    this.viewVideos     = this.viewVideos.bind(this)    
    this.notificationsFollowing  = this.notificationsFollowing.bind(this);
    
  }

  add(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8,txt9,txt10) {
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
          background: txt9,
          userName:txt10
      }]
    }))
  }

  nextID() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

 componentDidMount() {
    let subName=this.props.location.subName;
    this.doPostData(subName,'followSubject/');
    this.doGetData(subName,'getSubjectByName/');  
  }

  // get data from server
  doGetData(subName,route) {
    let getData = {
      name: subName
    }

    if (getData) {
      getData.name=getData.name.replace(/ /g, "%20");
      GetData(route,getData.name).then((result) => {
        if((result!==false)){
          var self=this;        
          self.add(result.name, result.date, result.hours, result.type,
            result.location, result.about, result.price, result.requredSkills, result.background, result.userName);                
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"Subject not found."});
          console.log(this.state.errorMsg);
        }
      });
    }
  }

  update(newSub, i) {
    this.setState(() => ({
      subjects: this.state.subjects.map(
        (sub) => (sub.id !== i) ? sub : {...sub, name: newSub}
      )
    }))
  }    

  // static videos for all subjects 
  viewVideos(i) {
    return (          
      <div className="card" style={{ width: 18 + 'rem', backgroundColor: `black`}}>
          <Video>
          <Iframe url="https://www.youtube.com/embed/OmLNs6zQIHo"
                    width="100%"
                    height="150px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
          </Video>
           <Video>
          <Iframe url="https://www.youtube.com/embed/7Qqtqj1odfw"
                    width="100%"
                    height="150px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
          </Video>
          <Video>
          <Iframe url="https://www.youtube.com/embed/lT67liGjZhw"
                    width="100%"
                    height="150px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
          </Video>
      </div>
      )
  }

  eachSubject (sub,i) {
    return (          
      <div key={'container'+i} className="myCard backgroundBlack textWhite" style={{width: `18rem`,borderRadius: `2px` }}>
          <SubjectByName key={'sub'+i} index={i} onChange={this.update }>
          <div style={{ backgroundImage: 'url('+sub.background+')', backgroundRepeat: 'no-repeat'}}>   
            <div className="card-body blackTxt">      
              <h1 className="card-title">{sub.name}</h1>
              <p className="card-text">{sub.date} <span className="greenElement">●</span>  {sub.hours}</p>
              <NavLink to=
                          //navigate to SubjectByName with the param sub.name
                          {{pathname: `/Home`, 
                            isJoined: true,
                            subName:sub.name}}
                            activeStyle={this.active} 
              className="btn btn-primary followSub" >Join</NavLink>
              <br/>
              <NavLink to=
                          //navigate to SubjectByName with the param sub.name
                          {{pathname: `/Home`, 
                            isDelete: true,
                            subName:sub.name,
                            subUserName:sub.userName}}
                            activeStyle={this.active} 
              className="btn btn-primary followSub" >Delete</NavLink>
            </div>
          </div>
          <div className="card-body backgroundBlack">      
            <div>
              <p className="card-text textCenter paddinTop5 marginTop20">{sub.about}</p>
            </div>
          </div>
          <div className="paddinTop5 marginTop20">
            <p className="card-text"><FaClockO/>&nbsp;{sub.date} ● {sub.hours}</p>
            <p className="card-text"><FaLocationArrow/>&nbsp;{sub.location}</p>
            <p className="card-text">{sub.type}</p>
            <p className="card-text">{sub.price} ₪</p>
          <div>
          <h5 className="textBold">participents:</h5>
          {this.viewVideos()}
          </div>
          <div>
            <h5 className="card-text textWhite">Sound system</h5>
            <h6 className="card-text nonBold font12 textGrey">EAW + 2 double sub 15inch</h6>            
            <h5 className="card-text textWhite">Mixer</h5>
            <h6 className="card-text nonBold font12 textGrey">AP0</h6>            
            <h5 className="card-text textWhite">Electric piano</h5>
            <h6 className="card-text nonBold font12 textGrey">Yamaha</h6>
            <h5 className="card-text textWhite">Amplifier</h5>
            <h6 className="card-text nonBold font12 textGrey">Fender: Twin Reverb 65</h6>
            <h6 className="card-text nonBold font12 textGrey">Marshall JCM500</h6>
            <h6 className="card-text nonBold font12 textGrey">Bass 800RMS</h6>  
            <h5 className="card-text textWhite">Microphone</h5>
            <h6 className="card-text nonBold font12 textGrey">Shure</h6>
          </div>
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
    this.notificationsFollowing();
    PostData(route, postData).then((result) => {
      if((result!==false)){
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
    if(this.flagNotification){
      NotificationManager.success('Success message', 'Yeahy! now you are following:)');  
      this.flagNotification = false;
    }
  }

  render() {
    if(!sessionStorage.getItem('userData'))
      return (<Redirect to={`/`}/>);
    return (
        <div>
          <NotificationContainer/>
          {this.state.subjects.map(this.eachSubject)}
        </div>
      )
  }
}

export default SubjectByNameList
