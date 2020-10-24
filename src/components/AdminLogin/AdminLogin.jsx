import React from 'react';
import './AdminLogin.scss';

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
            clientId="1055991846742-sk7vimca6aupub41gje6jcfj0d02cn5e.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          
          <MicrosoftLogin 
            clientId={'b3eb70dd-f3ec-4604-bc4c-611d78568158'} 
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
