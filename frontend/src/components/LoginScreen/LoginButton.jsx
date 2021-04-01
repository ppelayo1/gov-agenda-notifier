import React from 'react';
import './LoginButton.scss';

import { GoogleGLogo, MicrosoftLogo } from '../../utils/_icons';
import CustomButton from './CustomButton';

function LoginButton({ children, ...props }) {
  if (!children) {
    console.warn("You must pass a child to the LoginButton component.")
    return null;
  }

  if (typeof children !== 'string') {
    console.warn("You must provide a string as the child for LoginButton component.")
    return null;
  }
  
  const lowercasedProvider = children.toString().toLowerCase();
  const capitalizedProvider = () => {
    const firstLetterCapitalized = lowercasedProvider.slice(0,1).toUpperCase();
    const restOfLettersLowerCased = lowercasedProvider.slice(1);
    return firstLetterCapitalized + restOfLettersLowerCased;
  }
  
  return (
    <CustomButton {...props}>
      <div className="login-button-logo-container">
        { lowercasedProvider === 'microsoft' && <MicrosoftLogo className="login-button-logo-svg" />}
        { lowercasedProvider === 'google' && <GoogleGLogo className="login-button-logo-svg" />}
      </div>
      Sign In with {capitalizedProvider()}
    </CustomButton>
  );
}

export default LoginButton;
