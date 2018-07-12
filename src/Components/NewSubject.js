


import React, { Component } from 'react'
import SearchList from './SearchList'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';
import FaCaretSquareORight from 'react-icons/lib/fa/caret-square-o-right';

class InsertSubject extends Component {
    constructor(props) {
        super(props)
        this.state = {newName:0, newDate:0,newHours:0,newType:0,newLocation:0,newRequiredSkills:0,newUsername:0 };

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleName=this.handleName.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.handleHours=this.handleHours.bind(this);
        this.handleType=this.handleType.bind(this);
        this.handleLocation=this.handleLocation.bind(this);
        this.handleRequiredSkills=this.handleRequiredSkills.bind(this);
        this.handleUsername=this.handleUsername.bind(this);

        this.addSubject=this.addSubject.bind(this);
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
        console.log(`newName: ${event.target.value}`)
     
     }

     handleDate(event){
        this.setState({newDate: event.target.value})
        console.log(`newDate: ${event.target.value}`)
     
     }
     handleHours(event){
        this.setState({newHours: event.target.value})
        console.log(`newHours: ${event.target.value}`)
     
     }
     handleType(event){
        this.setState({newType: event.target.value})
        console.log(`newType: ${event.target.value}`)
     
     }    
     handleLocation(event){
        this.setState({newLocation: event.target.value})
        console.log(`newLocation: ${event.target.value}`)
     
     } 
     handleRequiredSkills(event){
        this.setState({newRequiredSkills: event.target.value})
        console.log(`newRequiredSkills: ${event.target.value}`)
     
     } 
     handleUsername(event){
        this.setState({newUsername: event.target.value})
        console.log(`newUsername: ${event.target.value}`)
     
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
        let newUsername = JSON.parse(sessionStorage.getItem('userData')).userName;


        (async () => {
          const rawResponse = await fetch('https://jemusic.herokuapp.com/insertSubject/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:newName,date:newDate,hours:newHours,type:newType,location:newLocation,requiredSkills:newRequiredSkills,userName:newUsername})
          });
            const content = await rawResponse.json();
            // console.log("content: " + content);
            ReactDOM.render(<SearchList books={content} />, document.getElementById("response"))
            console.log("userName: " + JSON.parse(sessionStorage.getItem('userData')).userName)
        })();
      }
    }



  // doPostData (newName,newDate,newHours,newType,newLocation,newRequiredSkills,route) {
  //   PostData(route, postData).then((result) => {
  //     if((result!=false)){
  //       this.setState({redirect: true});
  //        const content = JSON.parse(result);
  //       //  ReactDOM.render(<SearchList books={content} />, document.getElementById("response"));
  //     }
  //     else{
  //       this.setState({loginError:true});
  //       this.setState({errorMsg:"Can't insert a new subject."});
  //       console.log(this.state.errorMsg);
  //     }
  //   });
    
  // }
    addSubject(data){
      console.log(`data:` + data.toString());
    }

   // async handleSubmit(event){
   //      event.preventDefault();
   //      let newName = this.state.newName;
   //      let newDate = this.state.newDate;
   //      let newHours = this.state.newHours;
   //      let newType = this.state.newType;
   //      let newLocation = this.state.newLocation;
   //      let newRequiredSkills = this.state.newRequiredSkills;
   //      let newUsername = this.state.newUsername;
        
   //      console.log(`content: ${newName}, ${newDate}, ${newHours}, ${newType}, ${newLocation}, ${newRequiredSkills}, ${newUsername}!!`);
   //      // this.addSubject(`{${newName}, ${newDate}, ${newHours}, ${newType}, ${newLocation}, ${newRequiredSkills}, ${newUsername}}`);
   //      const options = {
   //        method: 'POST',
   //        headers: {
   //          'Accept': 'application/json',
   //          'Content-Type': 'application/json'
   //        },
   //         body: JSON.stringify({name:newName,date:newDate,hours:newHours,type:newType,location:newLocation,requiredSkills:newRequiredSkills,username:newUsername})
   //      }
   //      const request = new Request("https://jemusic.herokuapp.com/insertSubject/", options);
   //     const response = await fetch(request);
   //     const status = await.response.status;

   //     // if(status === 201)
   //  }

    render() {
        return (
            <div>
                <form action="https://jemusic.herokuapp.com/insertSubject/" method="POST" onSubmit={this.handleSubmit}
                      className="col-xs-12 col-md-4 offset-md-5 ">
                    <label>
                    Yeah  ! Let's create a new Jem : <br></br>
                        name:<br></br>
                        <input onChange={this.handleName} value={this.state.newName} type="text" name="name" />
                      </label><br></br>
                    <label>
                        date:<br></br>
                        <input onChange={this.handleDate} value={this.state.newDate} type="text" name="date" />
                      </label><br></br>
                    <label>
                        hours:<br></br>
                        <input onChange={this.handleHours} value={this.state.newHours} type="text" name="hours" />
                      </label><br></br>
                    <label>
                        type:<br></br>
                        <input onChange={this.handleType} value={this.state.newType} type="text" name="type" />
                      </label><br></br>
                    <label>
                        location:<br></br>
                        <input onChange={this.handleLocation} value={this.state.newLocation} type="text" name="location" />
                      </label><br></br>
                    <label>
                        requiredSkills:<br></br>
                        <input onChange={this.handleRequiredSkills} value={this.state.newRequiredSkills} type="text" name="requiredSkills" />
                      </label><br></br>
                   <button type="submit" className="btn btn-primary insertSub" onClick={this.delete}><FaCaretSquareORight size={30} background={'#666666'} /> </button> 

                </form>
                <div id="response">
                </div>
            </div>
        )
    }
}
export default InsertSubject

                    // <input type="submit" value="Go Go" />



////////////////////////////////////////////////////////////////////////////////////////
// import React, { Component } from 'react'
// // import SearchList from './SearchList'
// // import ReactDOM from 'react-dom'
// import {Redirect} from 'react-router-dom';
// import {PostData} from '../services/PostData';

// class BookByRankAuthor extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//           newName:0, 
//           newDate:0,
//           newHours:0,
//           newType:0,
//           newLocation:0,
//           newRequiredSkills:0,
//           redirect: false
//         };

//         this.handleSubmit=this.handleSubmit.bind(this);
//         this.handleName=this.handleName.bind(this);
//         this.handleDate=this.handleDate.bind(this);
//         this.handleHours=this.handleHours.bind(this);
//         this.handleType=this.handleType.bind(this);
//         this.handleLocation=this.handleLocation.bind(this);
//         this.handleRequiredSkills=this.handleRequiredSkills.bind(this);
//         this.addSubject=this.addSubject.bind(this);
//     }

//     add(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8,txt9) {
//       this.setState(prevState => ({
//         subjects: [
//         ...prevState.subjects,
//         {
//             id: this.nextID(),
//             name: txt1,
//             date: txt2,
//             hours: txt3,
//             type: txt4,
//             location: txt5,
//             about: txt6,
//             price: txt7,
//             requredSkills: txt8,
//             background: txt9
            
//         }]
//       }))
//     }
//      handleName(event){
//         this.setState({newName: event.target.value})
//         console.log(`newName: ${event.target.value}`)
     
//      }

//      handleDate(event){
//         this.setState({newDate: event.target.value})
//         console.log(`newDate: ${event.target.value}`)
     
//      }
//      handleHours(event){
//         this.setState({newHours: event.target.value})
//         console.log(`newHours: ${event.target.value}`)
     
//      }
//      handleType(event){
//         this.setState({newType: event.target.value})
//         console.log(`newType: ${event.target.value}`)
     
//      }    
//      handleLocation(event){
//         this.setState({newLocation: event.target.value})
//         console.log(`newLocation: ${event.target.value}`)
     
//      } 
//      handleRequiredSkills(event){
//         this.setState({newRequiredSkills: event.target.value})
//         console.log(`newRequiredSkills: ${event.target.value}`)
     
//      } 



//     handleSubmit(event){
        
//         //checks if the session is empty
//         if(!sessionStorage.getItem('userData'))
//           this.setState({redirect: true});
//         else{
//           event.preventDefault();
//           let newName = this.state.newName;
//           let newDate = this.state.newDate;
//           let newHours = this.state.newHours;
//           let newType = this.state.newType;
//           let newLocation = this.state.newLocation;
//           let newRequiredSkills = this.state.newRequiredSkills;
          
//           console.log(`content: ${newName}, ${newDate}, ${newHours}, ${newType}, ${newLocation}, ${newRequiredSkills}`);
          
//           this.doPostData(newName,newDate,newHours,newType,
//                           newLocation,newRequiredSkills,
//                           'insertSubject/');

//         }
//     }


//   doPostData (newName,newDate,newHours,newType,newLocation,newRequiredSkills,route) {
    
//     let postData = {
//       userName: JSON.parse(sessionStorage.getItem('userData')).userName,
//       name:newName,
//       date:newDate,
//       hours:newHours,
//       type:newType,
//       location:newLocation,
//       requiredSkills:newRequiredSkills
//     }

//     PostData(route, postData).then((result) => {
//       if((result!=false)){
//         this.setState({redirect: true});
//          const content = JSON.parse(result);
//         //  ReactDOM.render(<SearchList books={content} />, document.getElementById("response"));
//       }
//       else{
//         this.setState({loginError:true});
//         this.setState({errorMsg:"Can't insert a new subject."});
//         console.log(this.state.errorMsg);
//       }
//     });
    
//   }


//     addSubject(data){
//       console.log(`data:` + data.toString());
//     }

//    // async handleSubmit(event){
//    //      event.preventDefault();
//    //      let newName = this.state.newName;
//    //      let newDate = this.state.newDate;
//    //      let newHours = this.state.newHours;
//    //      let newType = this.state.newType;
//    //      let newLocation = this.state.newLocation;
//    //      let newRequiredSkills = this.state.newRequiredSkills;
//    //      let newUsername = this.state.newUsername;
        
//    //      console.log(`content: ${newName}, ${newDate}, ${newHours}, ${newType}, ${newLocation}, ${newRequiredSkills}, ${newUsername}!!`);
//    //      // this.addSubject(`{${newName}, ${newDate}, ${newHours}, ${newType}, ${newLocation}, ${newRequiredSkills}, ${newUsername}}`);
//    //      const options = {
//    //        method: 'POST',
//    //        headers: {
//    //          'Accept': 'application/json',
//    //          'Content-Type': 'application/json'
//    //        },
//    //         body: JSON.stringify({name:newName,date:newDate,hours:newHours,type:newType,location:newLocation,requiredSkills:newRequiredSkills,username:newUsername})
//    //      }
//    //      const request = new Request("https://jemusic.herokuapp.com/insertSubject/", options);
//    //     const response = await fetch(request);
//    //     const status = await.response.status;

//    //     // if(status === 201)
//    //  }

//     render() {
//       //Redirect to welcome.js(login) if the session is empty(the check is written above)
//       if(this.state.redirect)
//         return (<Redirect to={'/'}/>);
//       return (
//           <div>
//               <form action="https://jemusic.herokuapp.com/insertSubject/" method="POST" onSubmit={this.handleSubmit}>
//                   <label>
//                   Yeah  ! Let's create a new Jem : <br></br>
//                       name:
//                       <input onChange={this.handleName} value={this.state.newName} type="text" name="name" />
//                     </label><br></br>
//                   <label>
//                       date:
//                       <input onChange={this.handleDate} value={this.state.newDate} type="text" name="date" />
//                     </label><br></br>
//                   <label>
//                       hours:
//                       <input onChange={this.handleHours} value={this.state.newHours} type="text" name="hours" />
//                     </label><br></br>
//                   <label>
//                       type:
//                       <input onChange={this.handleType} value={this.state.newType} type="text" name="type" />
//                     </label><br></br>
//                   <label>
//                       location:
//                       <input onChange={this.handleLocation} value={this.state.newLocation} type="text" name="location" />
//                     </label><br></br>
//                   <label>
//                       requiredSkills:
//                       <input onChange={this.handleRequiredSkills} value={this.state.newRequiredSkills} type="text" name="requiredSkills" />
//                     </label><br></br>
//                   <br></br>
//                   <input type="submit" value="Go Go" />
//               </form>
//               {/* <div id="response">
//               </div> */}
//           </div>
//       )
//     }
// }
// export default BookByRankAuthor

