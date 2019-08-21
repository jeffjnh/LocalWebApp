import React from 'react'
import NavBar from '../utility/NavBar';
import logo from '../../assets/img/logo/AWS_logo_RGB_REV.svg';

/* 
 * NO backend is hooked up to this, just the UI
 */

function Login() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="login_card">
        <div className="logo_container">
          <img src={logo} className="logo" alt="aws-logo" />
          <div className="title_proserve">
            Professional <br />
            Services <br />
            Portfolio
          </div>
        </div>
        <div className="email">
          <input type="text" name="email" placeholder="alias" autoFocus="autofocus" /> @amazon.com<br /></div>
        <div className="password"><input type="password" name="password" placeholder="password" /><br /></div>
        <button className="button_login" type="button">Login</button>
      </div>
    </div>
  );
}

export default Login;
