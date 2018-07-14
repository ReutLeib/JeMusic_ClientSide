import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';
import {GetData} from '../services/GetData';
import logo from '../images/logo-JeMusic.png' 
import './style.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      errorMsg:"",
      redirect: false
    };
    this.login = this
      .login
      .bind(this);
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
    padding:"15px"

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
      return (<Redirect to={'/Home'}/>);

    let errMsg;
    if(this.state.loginError){
      errMsg=(<span class="welcomeText">{this.state.errorMsg}</span>)
    }
    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.login(response, 'google');
    }

    return (
      <div >
        <img  src={logo} alt="logo" style={this.logoImg}/> 
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