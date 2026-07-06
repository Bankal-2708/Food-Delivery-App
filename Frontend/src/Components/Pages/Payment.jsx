import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import QRCode from "react-qr-code";

function Payment() {
  const location = useLocation();
   const amount = location.state?.amount || 0;

   const upiId = "foodpoint@upi"; 
  const merchantName = "Food App Store";
  
   const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Scan to Pay</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-orange-200">
        <QRCode value={upiLink} size={256} />
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl font-semibold text-gray-700">Total Amount Payable:</p>
        <p className="text-4xl font-black text-green-700 mt-2">${amount}</p>
      </div>

      <div className="mt-10 space-y-4 w-full max-w-xs">
        <Link to="/cart">
          <button className="w-full border-2 border-orange-500 text-orange-600 py-3 rounded-lg font-bold hover:bg-orange-50">
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Payment;