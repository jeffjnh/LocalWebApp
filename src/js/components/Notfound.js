import React from 'react'
import NavBar from '../utility/NavBar';
import pecisage_sad_tiny from '../../assets/img/notfound/peciSage.sad.png';

// modeled after: https://answers.amazon.com/

const textArr = [
  "Forbidden",
  "Great Scott!",
  "I'm afraid I can't do that",
  "Uh oh!",
  "You shall not pass!"
];
let rand = Math.floor(Math.random() * textArr.length);

function Notfound() {
  return (
    <div>
      <NavBar></NavBar>
      <div id='error-wrapper'>
        <div className='pull-left' id='error-image'>
          <img src={pecisage_sad_tiny} alt="Pecisage.sad.tiny" />
        </div>
        <div id='error-content'>
          <h1>{textArr[rand]}</h1>
          <h3>You do not have access to this site.</h3>
          <div id='error-footer'>
            <div id='custom_message'>
              <p>
                You currently do not have permissions to access the ProServe Portfolio.<br />
                Access is open by default to all full-time AWS employees.
              </p>
              <p>
                Request permissions by emailing: <a href="mailto:miffyche@amazon.com">miffyche@amazon.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
