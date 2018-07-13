import React, { Component } from 'react'
import SearchList from './SearchList'
import ReactDOM from 'react-dom'
import MdSend from "react-icons/lib/md/send";
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';
import {GetData} from '../services/GetData';
import Home from './Home'
import { NavLink } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import './style.css';

//TODO: not able to display the patch, it collapse

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
    this.cleanDiv         = this.cleanDiv.bind(this)
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

  cleanDiv() {
    let arr = []
    arr.push({name:"", date:"", hours:"", type:"",
              location:"", about:"", price:"", requredSkills:"", background:""})
    return arr;
    
  }

  handleSubmit(event){
      event.preventDefault();
      let newSub = this.state.newSub;
      // NotificationManager.success('Success message', 'Yeahy! now you are following:)');

      (async () => {
        const rawResponse = await fetch('https://jemusic.herokuapp.com/getSubjectByDate/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({date:newSub})
        });
          const content = await rawResponse.json();
          console.log("content: " + content)
          // document.getElementById("response").innerHTML = ""
          ReactDOM.render(<SearchList subjects={this.cleanDiv()} />, document.getElementById("response"))
          ReactDOM.render(<SearchList subjects={content} />, document.getElementById("response"))
      })();
  }
    
  doGetData(route) {
    let getData = {
      name: JSON.parse(sessionStorage.getItem('userData')).userName
    }

    if (getData) {
      getData.name=getData.name.replace(/ /g, "%20");
      // console.log("NAMEEEE: " + getData.name);
      GetData(route,getData.name).then((result) => {
        if((result!=false)){
          var self=this;        
          result.map((result) => {            
            result.map((json) => {
              self.add(json.name, json.date, json.hours, json.type,
                      json.location, json.about, json.price, json.requredSkills, json.background);         
              console.log(json);          
            })
          })  
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"There is a problem with favorites."});
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
            <p className="card-text">{sub.date} <span className="greenElement">●</span>  {sub.hours}</p>
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
            className="btn btn-primary followSub" >Follow</NavLink>
          </Home>
        </div>
      </div>
      )

  }

  render() {
      return (
          <div>
            <div>
                <form action="https://jemusic.herokuapp.com/getSubjectByDate/" method="POST" onSubmit={this.handleSubmit}  
                      className="col-xs-12 col-md-4 offset-md-4 padding5 whiteCenterTxt">
                  <label>
                    <p> Date format: 2/10/2018</p>
                    Date:
                    <input onChange={this.handleSubChange} value={this.state.newSub} type="text" name="date" className="inputWidth"/>                  
                  </label>
                   <button type="submit" className="btn btn-primary" onClick={this.delete}><MdSend/> </button> 
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