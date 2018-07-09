import React, { Component } from 'react'
import SearchList from './SearchList'
import ReactDOM from 'react-dom'
import MdSend from "react-icons/lib/md/send";
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';
import {GetData} from '../services/GetData';
import Home from './Home'
import './style.css';
import { NavLink } from "react-router-dom";

//TODO: centered the elements(there is a problem)
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

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleRankChange=this.handleRankChange.bind(this);
    this.eachSubjects   = this.eachSubjects.bind(this)
    this.update         = this.update.bind(this)
    this.add            = this.add.bind(this)
    this.nextID         = this.nextID.bind(this)
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

  handleRankChange(event){
    this.setState({newRank: event.target.value})
  }

  handleSubmit(event){
      event.preventDefault();
      let newRank = this.state.newRank;
      (async () => {
        const rawResponse = await fetch('https://jemusic.herokuapp.com/getSubjectByDate/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({date:newRank})
        });
          const content = await rawResponse.json();
          ReactDOM.render(<SearchList subjects={content} />, document.getElementById("response"))
      })();
  }
    
  doGetData(route) {
    let getData = {
      name: JSON.parse(sessionStorage.getItem('userData')).userName
    }

    if (getData) {
      getData.name=getData.name.replace(/ /g, "%20");
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
      this.doGetData('getSubjectsByFavorites/)');
    } 
  }

  eachSubjects (sub,i) {
    // console.log(`backgroundImage: url(${sub.background})`)

    const imageUrl = require(`../images/${sub.background}`)
     return (          
      <div key={'container'+i} className="card cards" style={{width: `18rem`, backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat' }}>    
        <div className="card-body">
          <Home key={'sub'+i} index={i} onChange={this.update}>         
            <h1 className="card-title">{sub.name}</h1>
            <p className="card-text">{sub.date} * {sub.hours}</p>
            <p className="card-text">{sub.location}</p>
            <p className="card-text">{sub.type}</p>
            <p className="card-text">{sub.about}</p>
            <p className="card-text">{sub.price} $</p>
            <p className="card-text">{sub.requredSkills}</p>
            <p className="card-text">{sub.participent}</p>

            <NavLink to=
                        //navigate to SubjectByName with the param sub.name
                        {{pathname: "/Subject", 
                          param1: sub.name}}
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
              <form action="https://jemusic.herokuapp.com/getSubjectByDate/" method="POST" onSubmit={this.handleSubmit}>
                <label>
                  <p> Date format: 2/10/2018</p>
                  Date:
                  <input onChange={this.handleRankChange} value={this.state.newRank} type="text" name="date" />                  
                </label>
                 <button  type="submit" className="btn btn-primary" onClick={this.delete}><MdSend/> </button> 
              </form>
              <div id="response">
              </div>
                <div>
                {this.state.subjects.map(this.eachSubjects)}
            </div>
          </div>
      )
  }
}

export default Search