import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/Logo.jpg';
import Fb from '../../assets/Fb.jpeg';
import Tw from '../../assets/Tw.jpeg';
import Ld from '../../assets/Ld.jpeg';

function Footer() {
    const footerItem = [
        { id: 1, name: 'Home', path: '/' },
        { id: 2, name: 'About Us', path: '/about' },
        { id: 3, name: 'Delivery', path: '/delivery' },
        { id: 4, name: 'Privacy Policy', path: '/privacy' },
    ];

    return (
        <div id="contact" className="mt-16 w-full bg-zinc-700 px-6 py-8 md:px-16">
            <div className="flex flex-col justify-between gap-10 text-center md:flex-row md:text-left">
                <div className="flex max-w-sm flex-col items-center gap-4 text-center md:items-start md:text-left">
                    <img src={logo} alt="Food app logo" className="h-24 w-24 rounded-full object-cover" />
                    <p className="text-xl font-bold leading-relaxed text-white">
                        Delicious food made with love 🍽️
                        <br />
                        Fresh ingredients, authentic taste, and quick service.
                    </p>
                    <div className="flex gap-3">
                        <img src={Tw} alt="Twitter" className="h-10 w-10 rounded-full cursor-pointer" />
                        <img src={Fb} alt="Facebook" className="h-10 w-10 rounded-full cursor-pointer" />
                        <img src={Ld} alt="LinkedIn" className="h-10 w-10 rounded-full cursor-pointer" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-5 font-bold md:items-start">
                    <h1 className="text-3xl tracking-wide text-white">COMPANY</h1>
                    <ul className="space-y-2 text-xl text-white">
                        {footerItem.map((item) => (
                            <li key={item.id}>
                                <NavLink to={item.path} className="transition hover:text-orange-400">
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center gap-5 text-white md:items-start">
                    <h1 className="text-3xl tracking-wide">GET IN TOUCH</h1>
                    <div className="space-y-1 text-xl font-bold">
                        <p>+91 8218058872</p>
                        <p>support@food.com</p>
                        <Link to="/contact" className="block text-blue-400 hover:underline">
                            More Info
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-zinc-600/50 pt-6 text-center text-zinc-400">
                <p>Copyright 2026 © Food.com - All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
