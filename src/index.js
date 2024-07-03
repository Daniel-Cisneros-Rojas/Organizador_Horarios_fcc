import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <div className='container'>
    <div className='bubbles'>
      <span style={{'--i': '11'}}></span>
      <span style={{'--i': '12'}}></span>
      <span style={{'--i': '24'}}></span>
      <span style={{'--i': '9'}}></span>
      <span style={{'--i': '4'}}></span>
      <span style={{'--i': '19'}}></span>
      <span style={{'--i': '23'}}></span>
      <span style={{'--i': '11'}}></span>
      <span style={{'--i': '13'}}></span>
      <span style={{'--i': '15'}}></span>
      <span style={{'--i': '18'}}></span>
      <span style={{'--i': '16'}}></span>
      <span style={{'--i': '12'}}></span>
      <span style={{'--i': '9'}}></span>
      <span style={{'--i': '11'}}></span>
      <span style={{'--i': '21'}}></span>
      <span style={{'--i': '15'}}></span>
      <span style={{'--i': '12'}}></span>
      <span style={{'--i': '7'}}></span>
      <span style={{'--i': '11'}}></span>
    
    </div>
    <App />
    </div>
    </>
    
  </React.StrictMode>
);


