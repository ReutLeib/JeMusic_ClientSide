import React, {Component} from 'react'
import SubjectByName from './SubjectByName'
import {Redirect} from 'react-router-dom';



class SubjectByNameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
      ]
    }
    this.eachSubject   = this.eachSubject.bind(this);
    this.update     = this.update.bind(this);
    this.add        = this.add.bind(this)
    this.nextID     = this.nextID.bind(this)
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

    const url = "https://jemusic.herokuapp.com/getSubjectByName/Jem2";

    fetch(url).then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
        self.add(data.name, data.date, data.hours, data.type,
          data.location, data.about, data.price, data.requredSkills, data.background);                
    })  
}

  update(newSub, i) {
    this.setState(() => ({
      subjects: this.state.subjects.map(
        (sub) => (sub.id !== i) ? sub : {...sub, name: newSub}
      )
    }))
  }    

  eachSubject (sub,i) {
    const imageUrl = require(`../images/${sub.background}`)
    return (          
      <div key={'container'+i} className="myCard" style={{width: `18rem`,borderRadius: `2px` , backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat' }}>
        <div>
          <SubjectByName key={'sub'+i} index={i} onChange={this.update} >         
            <h1 className="card-title">{sub.name}</h1>
            <p className="card-text">{sub.date} * {sub.hours}</p>
            <p className="card-text">{sub.location}</p>
            <p className="card-text">{sub.type}</p>
            <p className="card-text">{sub.about}</p>
            <p className="card-text">{sub.price} $</p>
            <p className="card-text">{sub.requredSkills}</p>
            <p className="card-text">{sub.participent}</p>
          </SubjectByName>
        </div>
           <div style={{width: `18rem`, padding: "10px", background:`black` }}>
            <p>asdasdasd</p>
          </div>
      </div>
      )
  }

  render() {
    return (
        <div >
          {this.state.subjects.map(this.eachSubject)}
        </div>
      )
  }
}
export default SubjectByNameList
