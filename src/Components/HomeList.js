import React, {Component} from 'react'
import Home from './Home'
import './style.css';

class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
      ]
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
    const url = "https://jemusic.herokuapp.com/getSubjectsByFavorites/Yo";

    fetch(url).then((res) => {        
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
//   <div key={'container'+i} className="card" style={{width: `20rem`, backgroundImage: `url(defaultBackgroundPic.jpeg)` }}>
//  <div key={'container'+i} className="card" style={{width: `20rem`,
                  // background: 'url(' + require(`defaultBackgroundPic.jpeg`) + ')', backgroundRepeat: 'no-repeat' }}>

  eachSubjects (sub,i) {
    console.log(`backgroundImage: url(${sub.background})`)
    const imageUrl = require(`../images/${sub.background}`)

    if(this.flagHeader === false){
      this.flagHeader = true
           return (
            <div>
                <form action="https://books-ranking.herokuapp.com/bookByRank/" method="POST" onSubmit={this.handleSubmit}>
                  <label>
                    <p> book rank parameter is number must be under, equal 10</p>
                    (Enter 8 \ 9) <br></br>
                    Rank:
                    <input onChange={this.handleRankChange} value={this.state.newRank} type="text" name="rank" />                  
                  </label>
                  <input type="submit" value="Send" />
                </form>
                <div id="response">
                </div>
            </div>
        )
    }
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
    return (
        <div className="ideaList">
          {this.state.subjects.map(this.eachSubjects)}
        </div>
      )
  }
}
export default HomeList
