import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';
import {PostData} from '../services/PostData';

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
    let postData;

    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };

    }

    if (postData) {
        
      PostData('getUserByUserName/', postData).then((result) => {
        
        if((result!=false)&&(result.userName==postData.name)){

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

  render() {

    if (this.state.redirect )
      return (<Redirect to={'/Home'}/>);

    let errMsg;
    if(this.state.loginError){
      errMsg=(<h1 class="welcomeText">{this.state.errorMsg}</h1>)
    }
  

    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.login(response, 'google');
    }

    return (

      <div>
            
            <GoogleLogin 
              clientId= "377088806383-5m2155d1dktirnv3qs4e28ma4cicvfjg.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}/>

              {errMsg}
      </div>
    );
  }
}


export default Welcome;