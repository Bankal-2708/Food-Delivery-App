import React from 'react'
import App from '../../assets/AppStore.jpg'
import Play from '../../assets/PlayStore.jpg'

function Apk() {
  return (
    <div id="mobile-app" className='w-full flex flex-col gap-10 lg:gap-6 justify-center items-center text-center py-20 px-6 md:px-16 border-y border-gray-100 bg-gradient-to-b from-white to-gray-50/50'>
        <h1 className='text-5xl font-extrabold tracking-tight text-gray-900 leading-tight'>
          For Better Experience Download <br /> <span className='text-orange-500'>Food App</span>
        </h1>
        <div className='flex flex-col items-center justify-center gap-6 my-4 md:flex-row'>
            <img src={Play} alt="Play Store" className='h-20 shadow-md cursor-pointer hover:scale-105 active:scale-98 transition duration-300 rounded-2xl'/>
            <img src={App} alt="App Store" className='h-20 shadow-md cursor-pointer hover:scale-105 active:scale-98 transition duration-300 rounded-2xl' />
        </div>
    </div>
  )
}

export default Apk