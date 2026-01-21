import React from "react";
import Navbarimg from "../../assets/Navbar.jpg";
// import { useNavigate } from "react-router-dom";

function Header() {
  // const navigate = useNavigate()
  return (

    <div className="relative pt-20">
      <div className="mt-10 lg:mx-10">
        <img
          src={Navbarimg}
          alt=""
          className="md:h-170 h-190 w-full object-cover rounded-xl"
        />
      </div>


      <div className="text-white max-w-[50%] absolute md:bottom-20 bottom-10 left-20 md:left-24 flex flex-col gap-1 md:gap-8 items-start animate-[fadeIn_5s_ease-out_forwards]">
        <h1 className="font-bold md:text-7xl leading-tight text-6xl ">
          Order your <br />favourite food here
        </h1>
        <p className="md:text-2xl text-lg">
          Craving your favorite food? We deliver it fast. Choose from top
          restaurants around you. Enjoy smooth ordering and secure payments.
          Fresh, hot meals—anytime you want.
        </p>
        <a
          href="#menu"
          className="inline-block text-2xl font-semibold bg-white text-gray-600 px-6 py-2 rounded-2xl hover:scale-110 transition-transform cursor-pointer mt-4"
        >
          View Menu
        </a>
      </div>
    </div>
  );
}

export default Header;