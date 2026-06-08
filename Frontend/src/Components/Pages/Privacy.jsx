import React from 'react';

function Privacy() {
  return (
    <div className="w-full min-h-screen bg-gray-100 pt-32 pb-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white pb-12 p-8 md:p-12 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Privacy Policy</h1>

        <p className="text-lg mb-4 text-gray-600 leading-relaxed text-center md:text-left">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.
        </p>

        <hr className="border-gray-300 my-6" />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We may collect information such as your name, email address, contact details, and usage data when you interact with our website or services.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">2. How We Use Your Information</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your information is used to provide and improve our services, communicate with you, and ensure a better user experience.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">3. Sharing Your Information</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We do not sell or rent your personal information. We may share data with trusted third parties to help us operate our services or comply with legal obligations.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">4. Security</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction.
          </p>
        </div>

        <hr className="border-gray-300 my-6" />

        <p className="text-lg text-center font-semibold text-gray-500">
          By using our website, you agree to the terms outlined in this Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Privacy;