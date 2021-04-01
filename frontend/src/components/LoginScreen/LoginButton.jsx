import React from 'react';
import './LoginButton.scss';

function LoginButton({provider, ...props}) {
  return (
    <button className="login-button-container" {...props}>
      <div className="login-button-logo-container">
        X
      </div>
      Sign In with {provider}
    </button>
  );
}

export default LoginButton;
