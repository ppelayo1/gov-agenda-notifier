import React from 'react';
import './LoginScreen.scss';

import GoogleLogin from 'react-google-login';
import MicrosoftLogin from 'react-microsoft-login';

import cityLogo from '../../assets/SanJoseCityLogo.png';


function AdminLogin() {
  const responseGoogle = (response) => {
    console.log(response);
  }  

  const responseMicrosoft = (err, data) => {
    console.log(err, data);
  }
  
  return (
    <div className="login-wrapper">
      <img className="login-logo" src={cityLogo} alt="Logo of the City of San José" />

      <div className="login-box">
        <div className="login-text">
          Welcome to the City of San José<br/>City Council Meeting Virtual Agenda
        </div>

        <hr/>
        
        <div className="login-buttons-wrapper">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          
          <MicrosoftLogin 
            clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID} 
            authCallback={responseMicrosoft} 
            // buttonTheme="dark"
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;
