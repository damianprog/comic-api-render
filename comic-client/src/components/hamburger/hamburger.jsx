import React, { useState } from 'react';
import NavList from '../nav-list/nav-list';

import './hamburger.scss';

const Hamburger = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="hamburger">
      <span className="hamburger-icon" onClick={toggleMenu}>
        &#9776;
      </span>
      <div className={`${showMenu ? 'on-screen' : ''} menu`}>
        <span className="close-icon" onClick={toggleMenu}>
          &times;
        </span>
        <NavList close={toggleMenu} />
      </div>
    </div>
  );
};

export default Hamburger;
