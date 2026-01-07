import React from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/cartContext";

import logoimg from "../../assets/Logo.jpg";
import search from "../../assets/Search.jpeg";
import Cart from "../../assets/Cart.jpeg";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalQuantity = cart?.reduce((sum, item) => sum + item.count, 0);


  const navLinkClass = ({ isActive }) =>
    isActive ? "text-orange-700 font-bold" : "text-black";

  const items = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Menu", path: "/menu" },
    { id: 3, name: "Mobile-app", path: "/mobile" },
    { id: 4, name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="flex justify-between items-center mx-10">
      <div>
        <img
          src={logoimg}
          alt=""
          className="h-30 w-30 rounded-full obect-cover"
        />
      </div>
      <div>
        <ul className="flex gap-7 font-bold text-lg cursor-pointer">
          {items.map((item) => (
            <li key={item.id}>
              <NavLink className={navLinkClass} to={item.path}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between gap-5 w-120">
        <input
          type="text"
          placeholder="Search food..."
          className="border pl-2 rounded-xl w-70 font-bold text-lg"
        />
        <img src={search} alt="" className="h-12 w-12 rounded-full" />
        <Link to="/cart">
          <div className="relative ">
            <img
              src={Cart}
              alt="Cart"
              className="h-12 w-12 outline-offset-4 rounded-full cursor-pointer"
            />
            <span
              className="absolute top-10 -right-4 bg-red-700 text-white text-sm h-5 w-5 flex justify-center items-center
                     rounded-full"
            >
              {totalQuantity}
            </span>
          </div>
        </Link>
      </div>
      <div>
        <button className="font-bold text-xl border px-7 py-1 rounded-xl cursor-pointer">
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
