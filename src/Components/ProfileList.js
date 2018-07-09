import React, {Component} from 'react'
import Profile from './Profile'
import Video from './Video'
import './style.css';
import {Redirect} from 'react-router-dom';
import {GetData} from '../services/GetData';
import Iframe from 'react-iframe'


//TODO: show all subjects and videos of usr
class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [
      ],
      videos: [
      ],
      name:'',
      redirect: false
    }
    this.viewProfile      = this.viewProfile.bind(this)
    this.viewVideos       = this.viewVideos.bind(this)
    this.updateProfiles   = this.updateProfiles.bind(this)
    this.updateVideos     = this.updateVideos.bind(this)
    this.add              = this.add.bind(this)
    this.addVideo         = this.addVideo.bind(this)
    this.nextID           = this.nextID.bind(this)
    this.doGetData        = this.doGetData.bind(this)
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

doGetData(userName_,route) {
    let getData = {
      userName: userName_    }

    if (getData) {
      getData.userName=getData.userName.replace(/ /g, "%20");
      GetData(route,getData.userName).then((result) => {
        if((result!=false)){
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
    } else {}
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
    this.doGetData(data.userName,'getAllVideosByUserName/');
    var self=this; 
    self.add(data.userName, data.name, data.age,
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

  updateVideos (newProf, i) {
    this.setState(() => ({
      videos: this.state.videos.map(
        (prof) => (prof.id !== i) ? prof : {...prof, name: newProf}
      )
    }))
  }

  viewProfile (prof,i) {
    const imageUrl = require(`../images/${prof.profilePic}`)
    return (          
      <div key={'container'+i}className="card" style={{ margin:`0 auto`,width: 18 + 'rem', backgroundColor: `black`}}>
          <div style={{width: `170px`,height: `170px`, backgroundImage: `url(${imageUrl})`, 
                        backgroundRepeat: 'no-repeat',borderRadius: `50%`,
                        backgroundPosition: `center center`, margin: `0 auto` }}>
          </div>
        
          <div className="card-body">
          <Profile key={'prof'+i} index={i} onChange={this.updateProfiles}>         
            <h1 className="card-title" style={{ textAlign:`center`}}>{prof.userName} </h1>
            <p className="card-text" style={{ textAlign:`center`}}>{prof.name} * {prof.age} * {prof.city}</p>
          </Profile>
        </div>
        
        <div>
          <p>Jems:</p>
        </div>
        <div>
          <p>videos:</p>
            <div>
              {this.state.videos.map(this.viewVideos)}
            </div>
        </div>
      </div>
      )
  }

  viewVideos (prof,i) {
    return (          
      <div key={'container'+i}className="card" style={{ margin:`0 auto`,width: 18 + 'rem', backgroundColor: `black`}}>
          <div style={{width: `170px`,height: `170px`, 
                        backgroundRepeat: 'no-repeat',borderRadius: `50%`,
                        backgroundPosition: `center center`, margin: `0 auto` }}>
          </div>
        

          <div className="card-body">
          <Video key={'prof'+i} index={i} onChange={this.updateVideos}>
          <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                    width="100%"
                    height="190px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
          </Video>
        </div>
        
       
      </div>
      )
  }

  render() {
    //Redirect to welcome.js(login) if the session is empty(the check is written above)
    if(this.state.redirect)
      return (<Redirect to={'/'}/>);
    return (
      <div>
        {this.state.profiles.map(this.viewProfile)}
      </div>
    )
  }
}

export default ProfileList;