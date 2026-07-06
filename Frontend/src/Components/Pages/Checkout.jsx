import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const subtotal = location.state?.amount || 0;
  const deliveryFee = 2;
  const total = subtotal + deliveryFee - discount;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    if (coupon === 'WELCOME10') {
      setDiscount(5);
      alert('Coupon Applied!');
    } else {
      alert('Invalid Coupon');
    }
  };

  const handlePlaceOrder = () => {
    if (!address.street || !address.city || !address.phone) {
      alert('Please provide your delivery details!');
      return;
    }
    navigate('/payment', { state: { amount: total, deliveryAddress: address } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-20 pt-45 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-center text-4xl font-extrabold text-gray-800 md:text-left">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg lg:col-span-2">
            <div className="flex items-center gap-3 border-b pb-4">
              <span className="text-2xl">📍</span>
              <h2 className="text-2xl font-bold text-gray-700">Delivery Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Street Address</label>
                <input name="street" type="text" placeholder="e.g. 123 Campus Street" className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-orange-400" onChange={handleAddressChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-600">City</label>
                  <input name="city" type="text" placeholder="City" className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-orange-400" onChange={handleAddressChange} required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-600">Zip Code</label>
                  <input name="zipCode" type="text" placeholder="Zip" className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-orange-400" onChange={handleAddressChange} />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">Phone Number</label>
                <input name="phone" type="tel" placeholder="Enter 10-digit mobile number" className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-orange-400" onChange={handleAddressChange} required />
              </div>
            </div>
          </div>

          <div className="sticky top-32 h-fit space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
            <h2 className="border-b pb-4 text-2xl font-bold text-gray-700">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-500">Have a coupon?</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Code" className="flex-1 rounded-lg border border-gray-300 p-2 text-sm outline-none focus:ring-2 focus:ring-green-400" onChange={(e) => setCoupon(e.target.value)} />
                  <button onClick={applyCoupon} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700">Apply</button>
                </div>
              </div>

              <div className="space-y-3 pt-4 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-gray-800">₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span><span className="font-semibold text-gray-800">₹{deliveryFee}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between font-medium text-green-600"><span>Discount</span><span>-₹{discount}</span></div>
                )}
                <div className="flex justify-between border-t pt-4 text-2xl font-extrabold text-gray-900">
                  <span>Total</span>
                  <span className="text-orange-600">₹{total}</span>
                </div>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-white shadow-xl transition hover:bg-orange-600">
              Confirm & Pay Online
            </button>
            <button onClick={handlePlaceOrder} className="mt-2 w-full rounded-xl bg-gray-200 py-4 text-lg font-bold text-gray-700 transition hover:bg-gray-300">
              Confirm & COD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;