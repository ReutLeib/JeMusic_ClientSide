import React, {Component} from 'react'
import Profile from './Profile'
import MdAdd from 'react-icons/lib/md/add'



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

  add(txt1,txt2,txt3,txt4) {
    this.setState(prevState => ({
      profiles: [
      ...prevState.profiles,
      {
          id: this.nextID(),
          userName: txt1,
          name: txt2,
          age: txt3,
          city: txt4
          
      }]
    }))
  }
  nextID() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }

 componentDidMount() {   
 console.log("HERE");   
    const url = "https://jemusic.herokuapp.com/getUserByUserName/Yo";
    fetch(url).then((res) => {        
      return res.json();      
    }).then((data) => {        
      var self=this;        
        self.add(data.userName, data.name, data.age, data.city);        
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
    return (          
      <div key={'container'+i}className="card" style={{width: 18 + 'rem'}}>
        <div className="card-body">
          <Profile key={'prof'+i} index={i} onChange={this.update}>         
            <h1 className="card-title">{prof.userName}</h1>
            <p className="card-text">{prof.name}</p>
            <p className="card-text">{prof.age}</p>
            <p className="card-text">{prof.city}</p>
          </Profile>
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