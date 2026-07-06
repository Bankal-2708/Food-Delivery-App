import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [address, setAddress] = useState({
        street: "",
        city: "",
        zipCode: "",
        phone: ""
    });

    const subtotal = location.state?.amount || 0;
    const deliveryFee = 2;  
    const total = subtotal + deliveryFee - discount;

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const applyCoupon = () => {
        if (coupon === "WELCOME10") {
            setDiscount(5);  
            alert("Coupon Applied!");
        } else {
            alert("Invalid Coupon");
        }
    };

    const handlePlaceOrder = () => {
        if (!address.street || !address.city || !address.phone) {
            alert("Please provide your delivery details!");
            return;
        }
        navigate('/payment', { state: { amount: total, deliveryAddress: address } });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-32 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-10 text-gray-800 text-center md:text-left">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <span className="text-2xl">📍</span>
                            <h2 className="text-2xl font-bold text-gray-700">Delivery Address</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
                                <input 
                                    name="street" 
                                    type="text" 
                                    placeholder="e.g. 123 Campus Street" 
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition"
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                                    <input 
                                        name="city" 
                                        type="text" 
                                        placeholder="City" 
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Zip Code</label>
                                    <input 
                                        name="zipCode" 
                                        type="text" 
                                        placeholder="Zip" 
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                                        onChange={handleAddressChange}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                                <input 
                                    name="phone" 
                                    type="tel" 
                                    placeholder="Enter 10-digit mobile number" 
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition"
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                     <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6 h-fit sticky top-32">
                        <h2 className="text-2xl font-bold text-gray-700 border-b pb-4">Order Summary</h2>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500">Have a coupon?</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Code" 
                                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none"
                                        onChange={(e) => setCoupon(e.target.value)}
                                    />
                                    <button onClick={applyCoupon} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition text-sm">Apply</button>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 text-gray-600">
                                <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-gray-800">${subtotal}</span></div>
                                <div className="flex justify-between"><span>Delivery Fee</span><span className="font-semibold text-gray-800">${deliveryFee}</span></div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-medium"><span>Discount</span><span>-${discount}</span></div>
                                )}
                                <div className="flex justify-between font-extrabold text-2xl pt-4 border-t text-gray-900">
                                    <span>Total</span>
                                    <span className="text-orange-600">${total}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                        <button 
                            onClick={handlePlaceOrder}
                            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-[1.02] shadow-xl"
                        >
                            Confirm & Pay Online
                        </button>
                        <button 
                            onClick={handlePlaceOrder}
                            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-[1.02] shadow-xl mt-2"
                        >
                            Confirm & COD
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;