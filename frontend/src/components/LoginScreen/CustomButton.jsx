import React from 'react';
import './CustomButton.scss';

function CustomButton({ children, ...props }) {
  if (!children) {
    console.warn("You must pass a child to the CustomButton component.")
    return null;
  }

  return (
    <button className="custom-button-container" {...props}>
      {children}
    </button>
  );
}

export default CustomButton;
