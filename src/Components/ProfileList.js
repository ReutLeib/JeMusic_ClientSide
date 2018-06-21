import React, {Component} from 'react'
import Profile from './Profile'
import MdAdd from 'react-icons/lib/md/add'



class ProfileList extends Component {
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

  add(txt1,txt2,txt3,txt4) {
    this.setState(prevState => ({
      ideas: [
      ...prevState.ideas,
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
          <Profile key={'idea'+i} index={i} onChange={this.update}>         
            <h1 className="card-title">{idea.userName}</h1>
            <p className="card-text">{idea.name}</p>
            <p className="card-text">{idea.age}</p>
            <p className="card-text">{idea.city}</p>
          </Profile>
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


// import React from 'react';

// // add the card of book
// const ProfileList = ({ user, index }) => (
//   <div>
//        <div key={'container'+index}className="card" style={{width: 18 + 'rem'}}>
//          <div className="card-body">
//           <div key={'book'+index} index={index} >
//               <h5 className="card-title">{user.userName}</h5>
//               <p className="card-text">{user.name}</p>
//           </div>
//         </div>
//       </div>
   
//   </div>
    
//   );

// export default ProfileList;


// import React from 'react';

// // add the card of book
// const ProfileList = ({ books, index }) => (
//   <div>
//        <div key={'container'+index}className="card" style={{width: 18 + 'rem'}}>
//          <div className="card-body">
//           <div key={'book'+index} index={index} >
//               <h5 className="card-title">{books.userName}</h5>
//               <p className="card-text">{books.name}</p>
//           </div>
//         </div>
//       </div>
//   </div>
    
//   );

export default ProfileList;