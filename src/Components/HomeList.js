import React, {Component} from 'react'
import Home from './Home'
import MdAdd from 'react-icons/lib/md/add'



class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
      ]
    }
    this.eachSubjects   = this.eachSubjects.bind(this);
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
          participent: txt9
          
      }]
    }))
  }
  nextID() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }

 componentDidMount() {      
    const url = "https://jemusic.herokuapp.com/getSubjectsByFavorites/Yo";

    fetch(url).then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
      data.map((data) => {            
        data.map((json) => {
        self.add(json.name, json.date, json.hours, json.type,
          json.location, json.about, json.price, json.requredSkills);        
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
    return (          
      <div key={'container'+i}className="card" style={{width: 18 + 'rem'}}>
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
    return (
        <div className="ideaList">
          {this.state.subjects.map(this.eachSubjects)}
        </div>
      )
  }
}
export default HomeList
