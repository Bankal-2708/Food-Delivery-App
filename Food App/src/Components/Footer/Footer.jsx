import React from 'react'
import logo from '../../assets/Logo.jpg'
import Fb from '../../assets/Fb.jpeg'
import Tw from '../../assets/Tw.jpeg'
import Ld from '../../assets/Ld.jpeg'
import { Link,  NavLink } from 'react-router-dom'

function Footer() {

    const footerItem = [
        { id: 1, name: "Home", path: "/" },
        { id: 2, name: "About Us", path: "/about" },
        { id: 3, name: "Delivery", path: "/delivery" },
        { id: 4, name: "Privacy Pilicy", path: "/Privacy" },
    ];
    return (
        < >
            <div id="contact" className='lg:mx-10 bg-zinc-700 p-6 rounded-2xl  mt-10'>
                <div className='flex flex-col justify-between text-center md:flex md:flex-row  gap-10' >
                    <div className='flex flex-col gap-4 text-center items-center md:items-center'>
                        <img src={logo} alt=""
                            className="h-30 w-30 rounded-full obect-cover"
                        />
                        <p className='text-xl font-bold text-white'>
                            Delicious food made with love 🍽️<br />
                            Fresh ingredients, authentic taste, and quick service. <br />
                            Thank you for choosing us!
                        </p>
                        <div className='flex gap-3  ' >
                            <img src={Tw} alt="" className='h-10 w-10 rounded-full cursor-pointer' />
                            <img src={Fb} alt="" className='h-10 w-10 rounded-full cursor-pointer' />
                            <img src={Ld} alt="" className='h-10 w-10 rounded-full cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 items-center  font-bold'>
                        <h1 className='text-white text-3xl cursor-pointer'>COMPANY</h1>

                        <div className='text-white text-xl'>
                            <ul >
                                {footerItem.map((item) => (
                                    <li key={item.id}>
                                        <NavLink to={item.path}>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className='text-white flex flex-col gap-5 cursor-pointer'>
                        <h1 className='text-3xl cursor-pointer'>GET IN TOUCH</h1>
                        <div>
                            <p className='text-xl font-bold '>+91 8218058872</p>
                            <p className='text-xl font-bold '>contact@food.com</p>
                            <Link
                                to="/contact"
                                className="text-xl font-bold text-blue-400 hover:underline cursor-pointer"
                            >
                                More Info
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className='text-white text-center cursor-pointer md:mt-0 mt-5'>
                    <p>Copyright 2026 © Food.com -All Right Reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer