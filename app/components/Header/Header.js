import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.png';
import Banner2 from './images/bus.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <div className="header">
        <h1>HELP TCL</h1>
        <img src={Banner2} alt="Logo" />
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Signaler un retard
          </Link>
          <Link className="router-link" to="/features">
            A propos
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
