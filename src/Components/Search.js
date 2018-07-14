import React, { Component } from 'react'
import MdSend from "react-icons/lib/md/send";
import {PostData} from '../services/PostData';
import {GetData} from '../services/GetData';
import Home from './Home'
import { NavLink } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './style.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjects: [
      ],
      newItem:0,      
      redirect: false      
    }
    this.renderFlag = false;

    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleSubChange  = this.handleSubChange.bind(this);
    this.eachSubjects     = this.eachSubjects.bind(this)
    this.update           = this.update.bind(this)
    this.add              = this.add.bind(this)
    this.nextID           = this.nextID.bind(this)
    this.doPostData       = this.doPostData.bind(this)
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

  handleSubChange(event){
    this.setState({newSub: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    let newSub = this.state.newSub;
    this.doPostData(newSub,'getSubjectByDate/')
    document.getElementById("response").innerHTML = ""
      
  }
   
  doPostData (subDate,route) {
    let postData = {
      date: subDate
    }

    PostData(route, postData).then((result) => {
      if((result!==false)){
        
        //in order to remove the errorMsg if there is one
        if(this.state.loginError)
          this.setState({loginError:false});

        var self=this;        
            result.map((json) => {
              self.add(json.name, json.date, json.hours, json.type,
                      json.location, json.about, json.price, json.requredSkills, json.background);         
              console.log("im here: " + json.name);          
          })  
      }
      else{
        //printing this error in the render
        NotificationManager.error('Error message', 'Sorry, there is no Jems in this date.', 5000, () => {alert('callback');});
      }
    });
  }

  doGetData(route) {
    let getData = {
      name: JSON.parse(sessionStorage.getItem('userData')).userName
    }

    if (getData) {
      getData.name=getData.name.replace(/ /g, "%20");
      GetData(route,getData.name).then((result) => {
        if((result!==false)){
          var self=this;        
          result.map((result) => {            
            result.map((json) => {
              self.add(json.name, json.date, json.hours, json.type,
                      json.location, json.about, json.price, json.requredSkills, json.background);         
              console.log("wow: " + json);          
            })
          })  
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"There is a problem with favorites."});
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

  nextID() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }
  
  componentDidMount() {  
    //checks if the session is empty
    if(!sessionStorage.getItem('userData'))
     this.setState({redirect: true});
    else{
      this.doGetData('getSubjectsByFavorites/');
    } 
  }

  eachSubjects (sub,i) {
    let backUrl = require(`../images/${sub.background}`)
     return (          
      <div key={'container'+i} className="card cards" style={{width: `18rem`, backgroundImage: `url(${backUrl})`, backgroundRepeat: 'no-repeat' }}>    
        <div className="card-body">
            <Home key={'sub'+i} index={i} onChange={this.update}>         
            <h1 className="card-title">{sub.name}</h1>
            <p className="card-text">{sub.date} <span className="greenElement">●</span> {sub.hours}</p>
            <p className="card-text">{sub.location}</p>
            <p className="card-text">{sub.type}</p>
            <p className="card-text">{sub.price} ₪</p>
            <p className="card-text">{sub.requredSkills}</p>
            <p className="card-text">{sub.participent}</p>
            <NavLink to=
                        //navigate to SubjectByName with the param sub.name
                        {{pathname: "/Subject", 
                          subName: sub.name}}
                          activeStyle={this.active} 
            className="btn btn-primary followSub removeHoverGreen" >Follow</NavLink>
          </Home>
        </div>
      </div>
      )
  }

  render() {
      return (
          <div>
          <NotificationContainer/>
            <div>
                <form action="https://jemusic.herokuapp.com/getSubjectByDate/" method="POST" onSubmit={this.handleSubmit}  
                      className="col-xs-12 col-md-4 offset-md-5 padding5 whiteTxt">
                <label>
                  <p> Date format: 2/10/2018</p>
                    Date:
                  <input onChange={this.handleSubChange} value={this.state.newSub} type="text" name="date" className="inputWidth"/>                  
                </label>
                   <button type="submit" className="btn btn-primary removeHoverGreen text" onClick={this.delete}><MdSend/> </button> 
                </form>
                <div id="response">
                {this.state.subjects.map(this.eachSubjects)}
                </div>
            </div>
          </div>
      )
  }
}

export default Search