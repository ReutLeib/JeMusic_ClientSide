import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';
import FaCaretSquareORight from 'react-icons/lib/fa/caret-square-o-right';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class InsertSubject extends Component {
  constructor(props) {
      super(props)
      this.state = {isCreated:false,newSubDirect:""
                    ,newName:"", newDate:"",newHours:"",newType:""
                    ,newLocation:"",newRequiredSkills:"",newUsername:"" };
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleName=this.handleName.bind(this);
      this.handleDate=this.handleDate.bind(this);
      this.handleHours=this.handleHours.bind(this);
      this.handleType=this.handleType.bind(this);
      this.handleLocation=this.handleLocation.bind(this);
      this.handleRequiredSkills=this.handleRequiredSkills.bind(this);
      this.handleUsername=this.handleUsername.bind(this);

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
   handleName(event){
      this.setState({newName: event.target.value})   
   }
   handleDate(event){
      this.setState({newDate: event.target.value})   
   }
   handleHours(event){
      this.setState({newHours: event.target.value})   
   }
   handleType(event){
      this.setState({newType: event.target.value})   
   }    
   handleLocation(event){
      this.setState({newLocation: event.target.value})   
   } 
   handleRequiredSkills(event){
      this.setState({newRequiredSkills: event.target.value})   
   } 
   handleUsername(event){
      this.setState({newUsername: event.target.value})   
   }  

  handleSubmit(event){
     //checks if the session is empty
      if(!sessionStorage.getItem('userData'))
        this.setState({redirect: true});
      else{
      event.preventDefault();
      let newName = this.state.newName;
      let newDate = this.state.newDate;
      let newHours = this.state.newHours;
      let newType = this.state.newType;
      let newLocation = this.state.newLocation;
      let newRequiredSkills = this.state.newRequiredSkills;

      this.doPostData(newName,newDate,newHours,newType,
        newLocation,newRequiredSkills,'insertSubject/')
    }
  }

  doPostData (newName,newDate,newHours,newType,newLocation,newRequiredSkills,route) {
    let postData = {
      userName:JSON.parse(sessionStorage.getItem('userData')).userName,
      name:newName,
      date:newDate,
      hours:newHours,
      type:newType,
      location:newLocation,
      requiredSkills:newRequiredSkills
    }

    PostData(route, postData).then((result) => {
      if((result!==false)){
        this.setState({isCreated:true})
      }
      else{
        //printing this error as a notification
        NotificationManager.error('Error message','A problem occurred with adding your Jem.', 5000, () => {alert('callback');});
      }
    });
  }

  render() {
    if(this.state.isCreated){
      return(<Redirect to=
            //navigate to HomePage with the param isCreated
            {{pathname: `/Home`, 
              isCreated: true}}/>)
    }
    return (
      <div>
          <NotificationContainer/>
          <form action="https://jemusic.herokuapp.com/insertSubject/" method="POST" onSubmit={this.handleSubmit}

                className="col-xs-12 col-md-2 offset-md-5 whiteTxt">
              <label>
              Yeah  ! Let's create a new Jem : <br></br>
              name:<br></br>
                  <input placeholder="Choose a name" onChange={this.handleName} value={this.state.newName} type="text" name="name" />
                </label><br></br>
              <label>
                  date:<br></br>
                  <input placeholder="13/10/2018 for example" onChange={this.handleDate} value={this.state.newDate} type="text" name="date" />
                </label><br></br>
              <label>
                  hours:<br></br>
                  <input placeholder="18:00-20:00 for example" onChange={this.handleHours} value={this.state.newHours} type="text" name="hours" />
                </label><br></br>
              <label>
                  type:<br></br>
                  <input placeholder="Rock/Pop/etc.." onChange={this.handleType} value={this.state.newType} type="text" name="type" />
                </label><br></br>
              <label>
                  location:<br></br>
                  <input placeholder="Tel Aviv for example" onChange={this.handleLocation} value={this.state.newLocation} type="text" name="location" />
                </label><br></br>
              <label>
                  requiredSkills:<br></br>
                  <input placeholder="Guitar, Drumbs, etc.." onChange={this.handleRequiredSkills} value={this.state.newRequiredSkills} type="text" name="requiredSkills" />
                </label><br></br>
             <button type="submit" className="btn btn-primary insertSub removeHover" onClick={this.delete}><FaCaretSquareORight size={45} background={'#666666'} className="greenElement" /> </button> 
          </form>
      </div>
    )
  }
}

export default InsertSubject

