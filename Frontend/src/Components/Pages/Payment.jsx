import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';

function Payment() {
  const location = useLocation();
  const amount = location.state?.amount || 0;

  const upiId = 'foodpoint@upi';
  const merchantName = 'Food App Store';
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 pb-16 pt-32 md:px-16">
      <h1 className="mb-6 text-3xl font-bold text-orange-600">Scan to Pay</h1>

      <div className="rounded-2xl border-2 border-orange-200 bg-white p-6 shadow-xl">
        <QRCode value={upiLink} size={256} />
      </div>

      <div className="mt-8 w-full max-w-xs rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
        <p className="text-xl font-semibold text-gray-700">Total Amount Payable:</p>
        <p className="mt-2 text-4xl font-black text-green-700">₹{amount}</p>
      </div>

      <div className="mt-10 w-full max-w-xs space-y-4">
        <Link to="/cart" className="block w-full">
          <button className="w-full rounded-lg border-2 border-orange-500 py-3 font-bold text-orange-600 transition hover:bg-orange-50">
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;