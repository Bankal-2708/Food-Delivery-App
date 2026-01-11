import React from 'react'
import App from '../../assets/AppStore.jpg'
import Play from '../../assets/PlayStore.jpg'

function Apk() {
  return (
    <div className='text-center text-5xl font-bold'>
        <h1>For Better Experience Download <br />Food App</h1>
        <div className='flex flex-col items-center justify-center gap-6 my-10 md:flex-row'>
            <img src={Play} alt="" className='h-18 cursor-pointer hover:scale-110 transition rounded-2xl '/>
            <img src={App} alt="" className='h-19 cursor-pointer hover:scale-110 transition rounded-2xl ' />
        </div>
    </div>
  )
}

export default Apk