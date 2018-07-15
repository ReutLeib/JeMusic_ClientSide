import React, {Component} from 'react'
import Profile from './Profile'
import Video from './Video'
import Home from './Home'
import {Redirect} from 'react-router-dom';
import {GetData} from '../services/GetData';
import Iframe from 'react-iframe'
import './style.css';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [
      ],
      videos: [
      ],
      jems: [
      ],
      name:'',
      redirect: false
    }
    this.viewProfile      = this.viewProfile.bind(this)
    this.viewVideos       = this.viewVideos.bind(this)
    this.viewJems         = this.viewJems.bind(this)
    this.updateProfiles   = this.updateProfiles.bind(this)
    this.updateVideos     = this.updateVideos.bind(this)
    this.updateJems       = this.updateJems.bind(this)
    this.addProfile       = this.addProfile.bind(this)
    this.addVideo         = this.addVideo.bind(this)
    this.addJem           = this.addJem.bind(this)
    this.nextID           = this.nextID.bind(this)
    this.GetDataVideo     = this.GetDataVideo.bind(this)
    this.GetDataJem       = this.GetDataJem.bind(this)
  }

  addProfile(txt1,txt2,txt3,txt4,txt5) {
    this.setState(prevState => ({
      profiles: [
      ...prevState.profiles,
      {
          id: this.nextID(),
          userName: txt1,
          name: txt2,
          age: txt3,
          city: txt4,
          profilePic: txt5,
          
      }]
    }))
  }

 addVideo(txt1,txt2) {
    this.setState(prevState => ({
      videos: [
      ...prevState.videos,
      {
          id: this.nextID(),
          video: txt1,
          likes: txt2
          
      }]
    }))
  }

   addJem(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8,txt9) {
    this.setState(prevState => ({
      jems: [
      ...prevState.jems,
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

GetDataVideo(userName_,route) {
    let getData = {
      userName: userName_    }

    if (getData) {
      getData.userName=getData.userName.replace(/ /g, "%20");
      GetData(route,getData.userName).then((result) => {
        if((result!==false)){
          var self=this;     
            result.map((data) => {            
              self.addVideo(data.vid, data.likes);        
       })              
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"Subject not found."});
          console.log(this.state.errorMsg);
        }
      });
    }
}

GetDataJem(userName_,route) {
    let getData = {
      userName: userName_    }

    if (getData) {
      getData.userName=getData.userName.replace(/ /g, "%20");
      GetData(route,getData.userName).then((result) => {
        if((result!==false)){
          var self=this;  
           result.map((json) => {            
              self.addJem(json.name, json.date, json.hours, json.type,
                      json.location, json.about, json.price, json.requredSkills, json.background);         
              console.log(json);          
          })               
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"Subject not found."});
          console.log(this.state.errorMsg);
        }
      });
    }
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
    let data = JSON.parse(sessionStorage.getItem('userData'));
    this.GetDataVideo(data.userName,'getAllVideosByUserName/');
    this.GetDataJem(data.userName,'getAllSubjectsByUserName/');
    var self=this; 
    self.addProfile(data.userName, data.name, data.age,
              data.city, data.profilePic);        
  }
}

  updateProfiles(newProf, i) {
    this.setState(() => ({
      profiles: this.state.profiles.map(
        (prof) => (prof.id !== i) ? prof : {...prof, name: newProf}
      )
    }))
  } 

  updateVideos(newVid, i) {
    this.setState(() => ({
      videos: this.state.videos.map(
        (prof) => (prof.id !== i) ? prof : {...prof, name: newVid}
      )
    }))
  }

  updateJems(newJem, i) {
    this.setState(() => ({
      jems: this.state.jems.map(
        (prof) => (prof.id !== i) ? prof : {...prof, name: newJem}
      )
    }))
  }

  viewProfile(prof,i) {
    return (          
      <div key={'container'+i}className="card" style={{ margin:`0 auto`,width: 18 + 'rem', backgroundColor: `black`}}>
          <div style={{width: `170px`,height: `170px`, backgroundImage: 'url('+prof.profilePic+')',
                        backgroundRepeat: 'no-repeat',borderRadius: `50%`,
                        backgroundPosition: `center center`, margin: `0 auto` }}>
          </div>
          <div className="whiteTxt centerTxt">
          <Profile key={'prof'+i} index={i} onChange={this.updateProfiles}>         
            <h1 className="card-title" style={{ textAlign:`center`}}>{prof.userName} </h1>
            <p className="card-text" style={{ textAlign:`center`}}>{prof.name} <span className="greenElement">●</span>
             {prof.age} <span className="greenElement">●</span>  {prof.city}</p>
          </Profile>
        </div>
        <div>
          <p className="textWhite">Jems:</p>
            <div>
              {this.state.jems.map(this.viewJems)}
            </div>
        </div>
        <div>
          <p className="textWhite">videos:</p>
            <div>
              {this.state.videos.map(this.viewVideos)}
            </div>
        </div>
      </div>
    )
  }

  viewVideos(prof,i) {
    const videoUrl = `https://www.youtube.com/embed/${prof.video}`
    return (          
      <div key={'container'+i}className="card" style={{ margin:`0 auto`,width: 18 + 'rem', backgroundColor: `black`}}>
          <Video key={'prof'+i} index={i} onChange={this.updateVideos}>
          <Iframe url={videoUrl}
                    width="100%"
                    height="150px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
          </Video>
      </div>
      )
  }

  viewJems(prof,i) {
    return (          
      <div key={'container'+i} className="card cards" style={{width: `18rem`,backgroundImage:'url('+prof.background+')', backgroundRepeat: 'no-repeat' }}>    
        <div className="card-body">
          <Home key={'jem'+i} index={i} onChange={this.updateJems}>         
            <h1 className="card-title">{prof.name}</h1>
            <p className="card-text">{prof.date} <span className="greenElement">●</span>  {prof.hours}</p>
            <p className="card-text">{prof.location}</p>
          </Home>
        </div>
      </div>
      )
  }

  render() {
    //Redirect to welcome.js(login) if the session is empty(the check is written above)
    if(this.state.redirect)
      return (<Redirect to={`/`}/>);
    return (
      <div>
        {this.state.profiles.map(this.viewProfile)}
      </div>
    )
  }
}

export default ProfileList;