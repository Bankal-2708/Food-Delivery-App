import React from 'react';
import App from '../../assets/AppStore.jpg';
import Play from '../../assets/PlayStore.jpg';

function Apk() {
  return (
    <div id="mobile-app" className="w-full flex flex-col items-center justify-center gap-8 border-y border-gray-100 bg-gradient-to-b from-white to-gray-50/50 px-6 py-20 text-center md:px-16">
      <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
        For a better experience, download <span className="text-orange-500">Food App</span>
      </h1>
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
        <img src={Play} alt="Play Store" className="h-20 cursor-pointer rounded-2xl shadow-md transition duration-300 hover:scale-105" />
        <img src={App} alt="App Store" className="h-20 cursor-pointer rounded-2xl shadow-md transition duration-300 hover:scale-105" />
      </div>
    </div>
  );
}

export default Apk;