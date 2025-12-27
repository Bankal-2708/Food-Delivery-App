import React from "react";
import Navbarimg from "../../assets/Navbar.jpg";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="mt-10 mx-10">
        <img
          src={Navbarimg}
          alt=""
          className="h-170 w-full object-cover rounded-xl relative"
        />
      </div>
      <div className=" text-white max-w-[50%] absolute bottom-20 left-50 flex flex-col gap-8 items-start animate-[fadeIn_5s_ease-out_forwards]">
        <h1 className="font-bold text-7xl leading-tight">Order your <br/>favourite food here</h1>
        <p className="text-2xl">
          Craving your favorite food? We deliver it fast. Choose from top
          restaurants around you. Enjoy smooth ordering and secure payments.
          Fresh, hot meals—anytime you want.
        </p>
        <button onClick={()=>navigate('/menu')} className="inline-block text-2xl font-semibold bg-white text-gray-600 px-6 py-2 rounded-2xl hover:scale-110 transition-transform ">
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Header;
