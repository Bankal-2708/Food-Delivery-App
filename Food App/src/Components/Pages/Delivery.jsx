import React from 'react';

function Delivery() {
  return (
    
    <div className="min-h-screen bg-gray-50 pt-8 md:pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Delivery Information</h1>

        <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
          We are committed to delivering your food quickly and safely. <br className="hidden md:block"/> 
          This page provides all the details regarding our delivery services.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">1</span>
              Delivery Areas
            </h2>
            <p className="text-gray-600 leading-relaxed ml-10">
              We deliver to multiple areas in the city. Please check our map or enter your address at checkout to see if we deliver to your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">2</span>
              Delivery Time
            </h2>
            <p className="text-gray-600 leading-relaxed ml-10">
              Our usual delivery time is <span className="font-medium text-gray-800">30–45 minutes</span> from the time your order is confirmed. Times may vary based on location, weather, or order volume.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">3</span>
              Delivery Charges
            </h2>
            <p className="text-gray-600 leading-relaxed ml-10">
              Delivery charges are calculated based on your distance from the restaurant and are displayed clearly at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">4</span>
              Support
            </h2>
            <div className="bg-gray-50 p-4 rounded-xl ml-10">
              <p className="text-gray-600">
                If there is any issue with your delivery, please contact us:
              </p>
              <p className="mt-2">
                <span className="font-medium">Email:</span> <a href="mailto:contact@food.com" className="text-orange-600">contact@food.com</a>
              </p>
              <p>
                <span className="font-medium">Call:</span> <span className="text-gray-800">+91 8218058872</span>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-lg font-medium text-gray-700 italic">
            "Fresh, hot meals—delivered to your doorstep."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Delivery;