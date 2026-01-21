import React from 'react';

function About() {
  return (
    <div  className="min-h-screen bg-gray-100 lg:p-6 lg:pt-30 pt-9">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

        <p className="text-lg mb-4">
          Welcome to our food service! We are passionate about delivering delicious meals made with fresh ingredients directly to your doorstep.
        </p>

        <hr className="border-gray-300 my-6" />

        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          Our mission is to provide high-quality, tasty food with fast and reliable delivery, ensuring our customers enjoy every bite.
        </p>

        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg mb-4">
          To be the most loved and trusted food delivery service in the city, connecting people with fresh and healthy meals every day.
        </p>

        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p className="text-lg mb-4">
          Our team is made up of passionate chefs, delivery experts, and customer support professionals who work together to ensure the best experience for you.
        </p>

        <hr className="border-gray-300 my-6" />

        <p className="text-lg text-center">
          Thank you for choosing us! We promise to bring the taste of happiness to your table.
        </p>
      </div>
    </div>
  );
}

export default About;
