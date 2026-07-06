import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 pb-16 pt-40 md:px-16  flex items-center justify-center">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">About Us</h1>

        <p className="mb-4 text-lg leading-relaxed text-gray-600">
          Welcome to our food service! We are passionate about delivering delicious meals made with fresh ingredients directly to your doorstep.
        </p>

        <hr className="my-6 border-gray-300" />

        <h2 className="mb-4 text-2xl font-bold text-gray-800">Our Mission</h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-600">
          Our mission is to provide high-quality, tasty food with fast and reliable delivery, ensuring our customers enjoy every bite.
        </p>

        <h2 className="mb-4 text-2xl font-bold text-gray-800">Our Vision</h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-600">
          To be the most loved and trusted food delivery service in the city, connecting people with fresh and healthy meals every day.
        </p>

        <h2 className="mb-4 text-2xl font-bold text-gray-800">Our Team</h2>
        <p className="mb-4 text-lg leading-relaxed text-gray-600">
          Our team is made up of passionate chefs, delivery experts, and customer support professionals who work together to ensure the best experience for you.
        </p>

        <hr className="my-6 border-gray-300" />

        <p className="text-center text-lg font-semibold text-orange-500">
          Thank you for choosing us! We promise to bring the taste of happiness to your table.
        </p>
      </div>
    </div>
  );
}

export default About;
