import React from 'react';

function Delivery() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 pb-16 pt-20 md:px-16 flex items-center justify-center">      
    <div className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">Delivery Information</h1>
      <p className="mb-8 text-center text-lg leading-relaxed text-gray-600">
        We are committed to delivering your food quickly and safely. This page provides all the details regarding our delivery services.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-gray-800">
            <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">1</span>
            Delivery Areas
          </h2>
          <p className="ml-10 leading-relaxed text-gray-600">We deliver to multiple areas in the city. Please check your address at checkout to see if we cover your location.</p>
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-gray-800">
            <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">2</span>
            Delivery Time
          </h2>
          <p className="ml-10 leading-relaxed text-gray-600">Our usual delivery time is 30–45 minutes from the time your order is confirmed.</p>
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-gray-800">
            <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">3</span>
            Delivery Charges
          </h2>
          <p className="ml-10 leading-relaxed text-gray-600">Delivery charges are calculated based on distance and are showed clearly at checkout.</p>
        </section>
      </div>
    </div>
    </div>
  );
}

export default Delivery;