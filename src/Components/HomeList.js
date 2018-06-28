import React, {Component} from 'react'
import Home from './Home'
import './style.css';
import {Redirect} from 'react-router-dom';


class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
      ],
      name:'',
      redirect: false,
      products:[],
      pid:''
    }
    this.eachSubjects   = this.eachSubjects.bind(this)
    this.update     = this.update.bind(this)
    this.add        = this.add.bind(this)
    this.nextID     = this.nextID.bind(this)
    this.flagHeader = false
  }

  backgroundActive = {
      width: `20rem`,
      backgroundImage: `url(${this.background})`
  };

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
    console.log(sessionStorage.getItem('userData'));
    let data = JSON.parse(sessionStorage.getItem('userData'));
    console.log(data.name);
    var tmp_usr=data.name.replace(/ /g, "%20");
    const url = `https://jemusic.herokuapp.com/getSubjectsByFavorites/${tmp_usr}`;
    console.log(url); 
    fetch(url).then((res) => {  
        console.log(res);
        return res.json();      
      }).then((data) => {        
        var self=this;        
        data.map((data) => {            
          data.map((json) => {
          self.add(json.name, json.date, json.hours, json.type,
            json.location, json.about, json.price, json.requredSkills, json.background);        
            console.log(json);  
          })
        })    // endOf data.map((data)  
       })  
  }

  update(newSub, i) {
    this.setState(() => ({
      subjects: this.state.subjects.map(
        (sub) => (sub.id !== i) ? sub : {...sub, name: newSub}
      )
    }))
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
          </Home>
        </div>
      </div>
      )
  }

  render() {
    if(!sessionStorage.getItem('userData'))
      return (<Redirect to={'/'}/>);
    return (
        <div className="ideaList">
          {this.state.subjects.map(this.eachSubjects)}
        </div>
      )
  }
}
export default HomeList
