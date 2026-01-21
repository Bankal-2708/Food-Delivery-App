import React from 'react';

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100 lg:p-6 pt-10">
      <div className="max-w-4xl mx-auto bg-white md:pt-30 pb-12 p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="text-lg mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.
        </p>

        <hr className="border-gray-300 my-6" />

        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="text-lg mb-4">
          We may collect information such as your name, email address, contact details, and usage data when you interact with our website or services.
        </p>

        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
        <p className="text-lg mb-4">
          Your information is used to provide and improve our services, communicate with you, and ensure a better user experience.
        </p>

        <h2 className="text-2xl font-bold mb-4">3. Sharing Your Information</h2>
        <p className="text-lg mb-4">
          We do not sell or rent your personal information. We may share data with trusted third parties to help us operate our services or comply with legal obligations.
        </p>

        <h2 className="text-2xl font-bold mb-4">4. Security</h2>
        <p className="text-lg mb-4">
          We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction.
        </p>

        <hr className="border-gray-300 my-6" />

        <p className="text-lg text-center">
          By using our website, you agree to the terms outlined in this Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
