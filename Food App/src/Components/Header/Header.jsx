import React from "react";
import Navbarimg from '../../assets/Navbar.jpg'

function Header() {
  return (
    <div>
      <div className="mt-10 ">
        <img
          src={Navbarimg}
          alt=""
          className="h-170 w-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

export default Header;
