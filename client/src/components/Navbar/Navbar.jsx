import React from "react";
import "./Navbar.scss";
import clouds from "../../assets/clouds.png";
const Navbar = () => {
  return (
    <nav className='nav'>
      <div className='icon'>
        <img src={clouds} alt='logo' />
      </div>
      <div className='title'> <b>Micro</b> Drive</div>
    </nav>
  );
};

export default Navbar;
