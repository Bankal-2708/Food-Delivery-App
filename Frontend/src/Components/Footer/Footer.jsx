import React from 'react'
import logo from '../../assets/Logo.jpg'
import Fb from '../../assets/Fb.jpeg'
import Tw from '../../assets/Tw.jpeg'
import Ld from '../../assets/Ld.jpeg'
import { Link, NavLink } from 'react-router-dom'

function Footer() {

    const footerItem = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "About Us", path: "/about" },
        { id: 3, name: "Delivery", path: "/delivery" },
        { id: 4, name: "Privacy Policy", path: "/Privacy" },
    ];
    return (
        <>
            <div id="contact" className='w-full bg-zinc-700 p-8 mt-16 px-6 md:px-16'>
                <div className='flex flex-col justify-between text-center md:text-left md:flex-row gap-10' >
                    <div className='flex flex-col gap-4 text-center items-center md:items-start md:text-left max-w-sm'>
                        <img src={logo} alt=""
                            className="h-30 w-30 rounded-full object-cover"
                        />
                        <p className='text-xl font-bold text-white leading-relaxed'>
                            Delicious food made with love 🍽️<br />
                            Fresh ingredients, authentic taste, and quick service. <br />
                            Thank you for choosing us!
                        </p>
                        <div className='flex gap-3' >
                            <img src={Tw} alt="" className='h-10 w-10 rounded-full cursor-pointer' />
                            <img src={Fb} alt="" className='h-10 w-10 rounded-full cursor-pointer' />
                            <img src={Ld} alt="" className='h-10 w-10 rounded-full cursor-pointer' />
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-5 items-center md:items-start font-bold'>
                        <h1 className='text-white text-3xl cursor-pointer tracking-wide'>COMPANY</h1>
                        <div className='text-white text-xl'>
                            <ul className="space-y-2">
                                {footerItem.map((item) => (
                                    <li key={item.id}>
                                        <NavLink to={item.path} className="hover:text-orange-400 transition-colors">
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className='text-white flex flex-col gap-5 items-center md:items-start cursor-pointer'>
                        <h1 className='text-3xl cursor-pointer tracking-wide'>GET IN TOUCH</h1>
                        <div className="space-y-1">
                            <p className='text-xl font-bold '>+91 8218058872</p>
                            <p className='text-xl font-bold '>support@food.com</p>
                            <div className="pt-2">
                                <Link
                                    to="/contact"
                                    className="text-xl font-bold text-blue-400 hover:underline cursor-pointer"
                                >
                                    More Info
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-zinc-400 text-center cursor-pointer border-t border-zinc-600/50 mt-10 pt-6 md:mt-8'>
                    <p>Copyright 2026 © Food.com - All Rights Reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;