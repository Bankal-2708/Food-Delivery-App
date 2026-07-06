import React from 'react'
import logoimg from "../../assets/Logo.jpg";
import closeMenu from "../../assets/SideNavbarClose.png"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { useContext } from 'react';
import { CartContext } from '../../Context/cartContext';
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281

export default function Sidenavbar({ onClose }) {

    const navLinkClass = ({ isActive }) =>
        isActive ? "text-orange-700 font-bold" : "text-black";
    const navigate = useNavigate();
<<<<<<< HEAD
    const { pathname } = useLocation()
=======
    const { pathname } = useLocation();
    const { user, token, logout } = useContext(CartContext);
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281

    const items = [
        { id: 1, name: "Home", path: "#home", to: '/' },
        { id: 2, name: "Menu", path: "#menu", to: '/menu' },
        { id: 3, name: "Mobile-app", path: "#mobile-app", to: '/mobile' },
        { id: 4, name: "Contact Us", path: "#contact", to: '/contact' },
    ];

<<<<<<< HEAD
    return (
=======
    const handleLogout = async () => {
        await logout();
        onClose();
        navigate('/');
    };

    return (

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
        <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
        >
<<<<<<< HEAD
=======

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
            <div
                className="fixed top-0 left-0 h-screen w-64 bg-white/90 shadow-lg z-50 mx-1 pl-2 py-5
                   rounded-tr-3xl rounded-br-3xl shadow-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
<<<<<<< HEAD
=======

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
                <div className='flex justify-between'>
                    <img
                        src={logoimg}
                        alt=""
                        className='h-17 w-17 object-fill rounded-4xl'
                    />
                    <img
                        src={closeMenu}
                        alt=""
                        onClick={onClose}
<<<<<<< HEAD
                        className='h-17 w-17 object-cover rounded-4xl cursor-pointer mr-2'
=======
                        className='h-17 w-17 object-cover  rounded-4xl cursor-pointer mr-2'
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
                    />
                </div>

                <div>
                    <ul className="flex flex-col gap-4 font-bold text-lg cursor-pointer mt-20">
                        {items.map((item) => (
                            <li key={item.id} className='pl-4 '>
                                {item.path.startsWith("#") && pathname === '/' ? (
<<<<<<< HEAD
                                    <a 
                                        href={item.path} 
                                        onClick={onClose} 
                                        className="text-black hover:text-orange-700 font-bold"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <NavLink className={navLinkClass} to={item.to} onClick={onClose}>
=======
                                    <a href={item.path} className="text-black hover:text-orange-700 font-bold">
                                        {item.name}
                                    </a>
                                ) : (
                                    <NavLink className={navLinkClass} to={item.to}>
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
                                        {item.name}
                                    </NavLink>
                                )}
                                <hr className="border-t-2 border-gray-300 my-4" />
                            </li>
                        ))}
                    </ul>
                </div>

<<<<<<< HEAD
                <div className='flex justify-center w-full mt-40'>
                    <button
                        className='bg-gray-300 hover:bg-gray-400 py-2 px-7 font-bold rounded-lg cursor-pointer'
                        onClick={() => {
                            navigate('/authform');
                            onClose();
                        }}
                    >
                        Login
                    </button>
                </div>
=======
                {token ? (
                    <div className='flex flex-col items-center w-full mt-16 gap-3 px-4'>
                        <p className='font-bold text-gray-700 text-center'>
                            👋 {user?.name || 'User'}
                        </p>
                        <button
                            className='bg-red-500 hover:bg-red-600 text-white py-2 px-7 font-bold rounded-lg cursor-pointer w-full'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex justify-center w-full mt-40'>
                        <button
                            className='bg-gray-300 hover:bg-gray-400 py-2 px-7 font-bold rounded-lg cursor-pointer'
                            onClick={() => {
                                navigate('/authform');
                                onClose();
                            }}
                        >
                            Login
                        </button>
                    </div>
                )}
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
            </div>
        </div>
    );
}