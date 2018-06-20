import React, {Component} from 'react'
import Home from './Home'
import MdAdd from 'react-icons/lib/md/add'



class IdeasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [
      ]
    }
    this.eachIdea   = this.eachIdea.bind(this);
    this.update     = this.update.bind(this);
    this.delete     = this.delete.bind(this);
    this.add        = this.add.bind(this)
    this.nextID     = this.nextID.bind(this)
  }

  add(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8,txt9) {
    this.setState(prevState => ({
      ideas: [
      ...prevState.ideas,
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
    const url = "https://jemusic.herokuapp.com/getSubjectsByFavorites";

    fetch(url).then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
      data.map((data) => {            
        data.map((json) => {
        self.add(json.name, json.date, json.hours, json.type,
          json.location, json.about, json.price, json.requredSkills);        
        })
      })    // endOf data.map((data)  
    })  
}

  update(newIdea, i) {
    this.setState(() => ({
      ideas: this.state.ideas.map(
        (idea) => (idea.id !== i) ? idea : {...idea, name: newIdea}
      )
    }))
  }    

  delete(id) {
      //finish yourself- this should be called by onDelete
  }

  eachIdea (idea,i) {
    return (          
      <div key={'container'+i}className="card" style={{width: 18 + 'rem'}}>
        <div className="card-body">
          <Home key={'idea'+i} index={i} onChange={this.update}>         
            <h1 className="card-title">{idea.name}</h1>
            <p className="card-text">{idea.date} * {idea.hours}</p>
            <p className="card-text">{idea.location}</p>
            <p className="card-text">{idea.type}</p>
            <p className="card-text">{idea.about}</p>
            <p className="card-text">{idea.price} $</p>
            <p className="card-text">{idea.requredSkills}</p>
            <p className="card-text">{idea.participent}</p>
          </Home>
        </div>
      </div>
      )
  }

  render() {
      return (
        <div className="ideaList">
          {this.state.ideas.map(this.eachIdea)}
          <button id="add" className="btn btn-primary" style={{marginTop:7+'px'}}>
             <MdAdd/></button>
        </div>
      )
  }
}
export default IdeasList
