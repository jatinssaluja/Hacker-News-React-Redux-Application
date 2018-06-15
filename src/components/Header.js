import React from 'react';
import {Link} from 'react-router-dom';


const Header = ()=>{


    return (

     <header>

     <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={'/'} className="nav-link"> Hacker News</Link>
            </li>
            <li className="nav-item active">
              <Link to={'/chart'} className="nav-link"> Chart</Link>
            </li>
          </ul>
     </nav>
  </header>

    );

};


export default Header;
