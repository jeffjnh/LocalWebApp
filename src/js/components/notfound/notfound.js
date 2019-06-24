import React from 'react'
import './Notfound.css';
import pecisage_sad_tiny from '../../../assets/img/notfound/peciSage.sad.png';

// modeled after: https://answers.amazon.com/

function Notfound() {
  return (
    <div id='content-container'>
      <div id='error-page'>
        <div id='error-wrapper'>
          <div className='pull-left' id='error-image'>
            <img src={pecisage_sad_tiny} alt="Pecisage.sad.tiny" />
          </div>
          <div id='error-content'>
            <h1>Great Scott!</h1>
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
    </div>
  );
}

export default Notfound;
