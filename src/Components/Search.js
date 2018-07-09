import React, { Component } from 'react'
// import SearchList from './SearchList'
// import ReactDOM from 'react-dom'
import MdSend from "react-icons/lib/md/send";
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';


//TODO: centered the elements(there is a problem)
//TODO: not able to display the patch, it collapse

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
          newRank:0,      
          redirect: false      
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleRankChange=this.handleRankChange.bind(this);
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

  // handleRankChange(event){
  //   this.setState({newRank: event.target.value})
  // }

  //   handleSubmit(event){
  //     //checks if the session is empty
  //     if(!sessionStorage.getItem('userData'))
  //      this.setState({redirect: true});
  //     else{  
  //       let data = JSON.parse(sessionStorage.getItem('userData'));
  //       console.log(data);
  //       event.preventDefault();
  //       let newRank = this.state.newRank;
  //       (async () => {
  //         const rawResponse = await fetch('https://jemusic.herokuapp.com/getSubjectByDate/', {
  //           method: 'POST',
  //           headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({date:newRank})
  //         });
  //           const content = await rawResponse.json();
  //           ReactDOM.render(<SearchList subjects={content} />, document.getElementById("response"))
  //       })();
  //     }  
  //   }

    handleRankChange(event){
      this.setState({newRank: event.target.value})
    }
  
      handleSubmit(event){
        //checks if the session is empty
        if(!sessionStorage.getItem('userData'))
         this.setState({redirect: true});
        else{  
          event.preventDefault();
          this.doPostData(this.state.newRank,'getSubjectByDate/')
        }  
      }
  
      
      doPostData(newRank,route) {
      
        let postData = {
          date:newRank
        }
       
          PostData(route, postData).then((result) => {
            if((result!=false)){
              // this.setState({redirect: true});
              // const content = JSON.stringify(result);
              // ReactDOM.render(<SearchList subjects={content} />, document.getElementById("response"))
            }
            else{
              this.setState({loginError:true});
              this.setState({errorMsg:"Can't insert a new subject."});
              console.log(this.state.errorMsg);
            }
          });
    
      }

    render() {
      //Redirect to welcome.js(login) if the session is empty(the check is written above)
      if(this.state.redirect)
        return (<Redirect to={'/'}/>);

      return (
          <div>
              <form action="https://jemusic.herokuapp.com/getSubjectByDate/" method="POST" onSubmit={this.handleSubmit} >
                <label>
                  <p> Date format: 2/10/2018</p>
                  Date:
                  <input onChange={this.handleRankChange} value={this.state.newRank} type="text" name="date" />                  
                </label>
                  <button  type="submit" className="btn btn-primary" onClick={this.delete} ><MdSend/> </button> 
              </form>
              <div id="response">
              </div>
          </div>
      )
    }
}

export default Search