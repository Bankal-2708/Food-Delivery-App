import React from 'react';

function Privacy() {
  return (
    <div className="  min-h-screen bg-gray-100 px-6 pb-16 pt-40 md:px-16  flex items-center justify-center">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">Privacy Policy</h1>

        <p className="mb-4 text-lg leading-relaxed text-gray-600">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.
        </p>

        <hr className="my-6 border-gray-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
          <p className="text-lg leading-relaxed text-gray-600">We may collect information such as your name, email address, contact details, and usage data when you interact with our website or services.</p>

          <h2 className="text-2xl font-bold text-gray-800">2. How We Use Your Information</h2>
          <p className="text-lg leading-relaxed text-gray-600">Your information is used to provide and improve our services, communicate with you, and ensure a better user experience.</p>

          <h2 className="text-2xl font-bold text-gray-800">3. Sharing Your Information</h2>
          <p className="text-lg leading-relaxed text-gray-600">We do not sell or rent your personal information. We may share data with trusted third parties to help us operate our services or comply with legal obligations.</p>

          <h2 className="text-2xl font-bold text-gray-800">4. Security</h2>
          <p className="text-lg leading-relaxed text-gray-600">We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction.</p>
        </div>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-lg font-semibold text-gray-500">
          By using our website, you agree to the terms outlined in this Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
