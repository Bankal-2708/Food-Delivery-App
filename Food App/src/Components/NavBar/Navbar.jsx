import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/cartContext";

import logoimg from "../../assets/Logo.jpg";
import search from "../../assets/Search.jpeg";
import Cart from "../../assets/Cart.jpeg";
import sidemenu from "../../assets/sideMenu.png"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Sidenavbar from "./Sidenavbar";

function Navbar() {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [searchTerm, setSearchTerm]=useState();

  const { searchTerm, setSearchTerm } = useContext(CartContext);

  const totalQuantity = cart?.reduce((sum, item) => sum + item.count, 0);


  const navLinkClass = ({ isActive }) =>
    isActive ? "text-orange-700 font-bold" : "text-black";

  const items = [
    { id: 1, name: "Home", path: "#home", to: '/' },
    { id: 2, name: "Menu", path: "#menu", to: '/' },
    { id: 3, name: "Mobile-app", path: "#mobile-app", to: '/' },
    { id: 4, name: "Contact Us", path: "#contact", to: '/' },
  ];

  return (
    <nav id="home" className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-10 py-3"
    >

      <div className="hidden sm:block">
        <img
          src={logoimg}
          alt=""
          className="lg:h-30 lg:w-30 md:h-22 md:w-22  rounded-full obect-cover"
        />
      </div>

      <div className="block sm:hidden p-1">
        <img src={sidemenu} alt="Menu" className="w-14 h-13  rounded-xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {open ? <Sidenavbar onClose={() => setOpen(false)} className='md: hidden' /> : null}
      </div>

      <div className="hidden sm:block">
        <ul className="flex lg:gap-7 md:gap-3 font-bold text-lg cursor-pointer">
          {items.map((item) => (
            <li key={item.id}>
              {item.path.startsWith("#") && pathname === '/' ? (
                <a
                  href={item.path}
                  className="text-black hover:text-orange-700 font-bold md:text-sm lg:text-xl"
                >
                  {item.name}
                </a>
              ) : (
                <NavLink className={navLinkClass} to={item.to}>
                  {item.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex lg:justify-between  px-4 pt-2 lg:px-0 lg:py-0  md:w-85 gap-8  lg:w-120 text-gray-400 ">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 h-10 rounded-xl w-55 font-bold text-base sm:w-70"
        />
        <img
          src={search}
          alt=""
          className="h-12 w-12 rounded-full hidden lg:block"
        />
        <Link to="/cart">
          <div className="relative ">
            <img
              src={Cart}
              alt="Cart"
              className="lg:h-12 lg:w-12  h-10 w-10 object-cover md:mb-0 mb-2 outline-offset-4 rounded-full cursor-pointer "
            />
            <span
              className="absolute -top-1 -right-5 bg-red-700 text-white text-sm h-5 w-5 flex justify-center items-center
                     rounded-full"
            >
              {totalQuantity}
            </span>
          </div>
        </Link>
      </div>

      <div>
        <button className="hover:bg-gray-300 hover:scale-110 transform duration-200 bg-gray-200 font-bold lg:text-xl md:text-lg  shadow-2xl lg:px-5 lg:py-1 md:px-2 md:py-0 rounded-xl cursor-pointer hidden sm:block"
          onClick={() => navigate("/authform")}
        >
          Sign In
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
