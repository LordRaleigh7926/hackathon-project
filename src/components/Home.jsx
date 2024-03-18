// HomePage.js

import React from 'react';


const primaryColor = '#ffffff';
const secondaryColor = '#1f2029 ';
const accentColor = '#FDB813';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px',
        backgroundColor: secondaryColor,
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: primaryColor, fontSize: '3rem' }}>
        Welcome to Our Educational Website!
      </h1>
      <p style={{ color: primaryColor, fontSize: '1.2rem', textAlign: 'center' }}>
        Here, you'll find a variety of resources to help you learn and grow.
      </p>
      <button
        style={{
          backgroundColor: accentColor,
          color: primaryColor,
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          
          fontSize: '1.1rem',
          marginTop: '30px',
        }}
      >
        Click on the Learn button to create a new learning tab.
      </button>
      <button
        style={{
          backgroundColor: accentColor,
          color: primaryColor,
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          
          fontSize: '1.1rem',
          marginTop: '30px',
        }}
      >
        Else click on Learning Tab to view the existing ones.
      </button>
    </div>
  );
};

export default HomePage;