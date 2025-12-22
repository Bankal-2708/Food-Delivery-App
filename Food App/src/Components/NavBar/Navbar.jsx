import React from 'react'

import logoimg from '../../assets/Logo.jpg'
import search from '../../assets/Search.jpeg'
import cart from '../../assets/Cart.jpeg'
import { NavLink } from 'react-router-dom'



function Navbar() {

    const navLinkClass=({isActive})=>
        isActive
        ? "text-orange-700 font-bold"
        : "text-black"

     const items=[
        {id:1, name:"Home", path:'/'},
        {id:2, name:"Menu", path:'/menu'},
        {id:3, name:"Mobile-app", path:'/mobile'},
        {id:4, name:"Contact Us", path:'/contact'}
     ]

  return (
    <nav className='flex justify-between items-center mx-10'>
         
            <div>
                <img src={logoimg} alt="" className='h-30 w-30 rounded-full obect-cover'/>
            </div>
            <div>
                <ul className='flex gap-7 font-bold text-lg'>
                    {items.map((item)=>(
                        <li key={item.id}>
                            <NavLink className={navLinkClass} to={item.path}>{item.name}</NavLink>
                            
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-between gap-5 w-120'> 
                <input type="text" placeholder='Search food...' className='border pl-2 rounded-xl w-70 font-bold text-lg'/>
                <img src={search}alt="" className='h-12 w-12 rounded-full' />
                <img src={cart} alt="" className='h-12 w-12 rounded-full'/>
            </div>
            <div>
                <button className='font-bold text-xl border px-7 py-1 rounded-xl'>Sign In</button>
            </div>

        
        
    </nav>
  )
}

export default Navbar