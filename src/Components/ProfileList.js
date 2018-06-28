import React, {Component} from 'react'
import Profile from './Profile'
import './style.css';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [
      ]
    }
    this.eachProfile   = this.eachProfile.bind(this);
    this.update     = this.update.bind(this);
    this.add        = this.add.bind(this)
    this.nextID     = this.nextID.bind(this)
  }

  add(txt1,txt2,txt3,txt4,txt5) {
    this.setState(prevState => ({
      profiles: [
      ...prevState.profiles,
      {
          id: this.nextID(),
          userName: txt1,
          name: txt2,
          age: txt3,
          city: txt4,
          profilePic: txt5
          
      }]
    }))
  }
  nextID() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }

 componentDidMount() {   
    const url = "https://jemusic.herokuapp.com/getUserByUserName/Yo";
    fetch(url).then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
        self.add(data.userName, data.name, data.age, data.city, data.profilePic);        
    })  
}

  update(newProf, i) {
    this.setState(() => ({
      profiles: this.state.profiles.map(
        (prof) => (prof.id !== i) ? prof : {...prof, name: newProf}
      )
    }))
  } 

  eachProfile (prof,i) {
    const imageUrl = require(`../images/${prof.profilePic}`)
    return (          
      <div key={'container'+i}className="card" style={{width: 18 + 'rem', backgroundColor: `black`}}>
          <div style={{width: `170px`,height: `170px`, backgroundImage: `url(${imageUrl})`, 
                        backgroundRepeat: 'no-repeat',borderRadius: `50%`,
                        backgroundPosition: `center center`, margin: `0 auto` }}>
          </div>
        
          <div className="card-body">
          <Profile key={'prof'+i} index={i} onChange={this.update}>         
            <h1 className="card-title" style={{ textAlign:`center`}}>{prof.userName} </h1>
            <p className="card-text" style={{ textAlign:`center`}}>{prof.name} * {prof.age} * {prof.city}</p>
          </Profile>
        </div>
        
        <div>
          <p>Jems:</p>
        </div>

        <div>
          <p>Videos:</p>
        </div>
      </div>
      )
  }

  render() {
      return (
        <div className="ideaList">
          {this.state.profiles.map(this.eachProfile)}
        </div>
      )
  }
}

export default ProfileList;