import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import logo from '../assets/images/logo.png';


console.log(logo);

function Header() {

    // const logo = require ('../assets/images/logo.png');
    
    return (
        <header>
            <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
                <Link className="navbar-brand" href="" to="/"><img src={logo} alt="" /></Link>
                {/* <div className="logo">
                 
                </div> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navvarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              {auth().currentUser
              ? <div className="navbar-nav">
                <Link className="nav-item nav-link mr-3" to="/chat">Profile</Link>
                <button className="btn btn-primary mr-3" onClick={() => auth().signOut()}>Logout</button>
                </div>
                : <div className="navbar-nav">
                  <Link type="button" className="btn btn-primary text-white px-5 mr-3 nav-item nav-link" to="/login">Sign In</Link>
                  <Link type="button" className ="btn btn-danger text-white px-5 mr-3 nav-item nav-link" to="/signup">Sign Up</Link>
                  </div>}
            </div>
            </nav>
        </header>
    );
}

export default Header;