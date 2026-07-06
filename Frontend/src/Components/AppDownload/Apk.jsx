import React from 'react'
import App from '../../assets/AppStore.jpg'
import Play from '../../assets/PlayStore.jpg'

function Apk() {
  return (
<<<<<<< HEAD
    <div id="mobile-app" className='w-full flex flex-col gap-10 lg:gap-6 justify-center items-center text-center py-20 px-6 md:px-16 border-y border-gray-100 bg-gradient-to-b from-white to-gray-50/50'>
        <h1 className='text-5xl font-extrabold tracking-tight text-gray-900 leading-tight'>
          For Better Experience Download <br /> <span className='text-orange-500'>Food App</span>
        </h1>
        <div className='flex flex-col items-center justify-center gap-6 my-4 md:flex-row'>
            <img src={Play} alt="Play Store" className='h-20 shadow-md cursor-pointer hover:scale-105 active:scale-98 transition duration-300 rounded-2xl'/>
            <img src={App} alt="App Store" className='h-20 shadow-md cursor-pointer hover:scale-105 active:scale-98 transition duration-300 rounded-2xl' />
=======
    <div id="mobile-app" className='flex flex-col  gap-15 lg:gap-5 justify-center text-center  text-5xl font-bold h-200  shadow-2xl lg:mb-10 rounded-3xl lg:mx-10'>
        <h1>For Better Experience Download <br />Food App</h1>
        <div className='flex flex-col items-center justify-center gap-6 my-10 md:flex-row'>
            <img src={Play} alt="" className='h-18 cursor-pointer hover:scale-110 transition rounded-2xl '/>
            <img src={App} alt="" className='h-19 cursor-pointer hover:scale-110 transition rounded-2xl ' />
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
        </div>
    </div>
  )
}

export default Apk