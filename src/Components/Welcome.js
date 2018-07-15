import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';
import {GetData} from '../services/GetData';
import './style.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      errorMsg:"",
      redirect: false
    };
    this.checkLoggedIn=this.checkLoggedIn.bind(this);
    this.login = this
      .login
      .bind(this);
    this.checkLoggedIn()
  }

  checkLoggedIn() {
    const login = sessionStorage.getItem("userData")
    if(login) {
      //doesn't work this way...
      // this.setState({redirect: true});
      this.state.redirect = true
    }

  }

  login(res, type) {
    let getData;

    if (type === 'google' && res.w3.U3) {
      getData = {
        name: res.w3.ig,
      };

    }

    if (getData) {
      var tmp_userName=getData.name;
      getData.name=getData.name.replace(/ /g, "%20");
      GetData('getUserByUserName/', getData.name).then((result) => {
        
        if((result!==false)&&(result.userName===tmp_userName)){
          let responseJson = result;
          sessionStorage.setItem("userData", JSON.stringify(responseJson));
          console.log(sessionStorage.getItem("userData"));
          this.setState({redirect: true});
        }
        else{
          this.setState({loginError:true});
          this.setState({errorMsg:"User is NOT exist, please try again."});
          console.log(this.state.errorMsg);
        }
      });
    } else {}
  }

  loginBtn = {
    display:"block",
    margin:"0 auto",
    marginTop:"60px",
    
    backgroundColor: "#d82525",
    border:0,
    padding:"15px",

    fontFamily: "Alfa Slab One', cursive",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white"
  };
  logoImg={
    display:"block",
    margin:"0 auto",
    marginTop:"120px",
    backgroundColor: "white",
    borderRadius: "150px",
    paddingLeft:"10px"
  };

  render() {
    if (this.state.redirect )
      return (<Redirect to={`/Home`}/>);

    let errMsg;
    if(this.state.loginError){
      errMsg=(<span class="welcomeText ">{this.state.errorMsg}</span>)
    }
    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.login(response, 'google');
    }

    return (
      <div >
        <img  src="https://firebasestorage.googleapis.com/v0/b/jemmusic-5c24e.appspot.com/o/logo-JeMusic.png?alt=media&token=50efe54d-55a6-44c7-bab6-87ba1ce86e7f" alt="logo" style={this.logoImg}/> 
        <GoogleLogin 
          clientId= "377088806383-b47hpo3htkddlct3rme0d70n0erl490q.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          style={this.loginBtn}/>
          {errMsg}
      </div>
    );
  }
}


export default Welcome;