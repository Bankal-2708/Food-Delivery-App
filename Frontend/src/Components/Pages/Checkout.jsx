import React, { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../Context/cartContext";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  
   
  const cartSubtotal = location.state?.amount || 0;

   
  const deliveryCharge = cartSubtotal > 0 && cartSubtotal < 500 ? 49 : 0;
  const platformFee = cartSubtotal > 0 ? 2 : 0;
  const grandTotal = cartSubtotal + deliveryCharge + platformFee;

  const [paymentMethod, setPaymentMethod] = useState("COD");  
  const [showQR, setShowQR] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "ONLINE") {
      
      setShowQR(true);
    } else {
       
      alert(`🎉 Order Confirmed via Cash on Delivery (COD)!\nTotal Bill: ₹${grandTotal}\nYour food will arrive shortly!`);
      clearCart(); 
      navigate("/");
    }
  };

  const handleOnlinePaymentSuccess = () => {
    alert(`🎉 Online Payment Verified Successfully!\nTotal Paid: ₹${grandTotal}\nYour order has been sent to the kitchen!`);
    clearCart();
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-32 pb-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        
         
        {!showQR ? (
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Delivery Information</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              />
              <input
                required
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              />
            </div>

            <input
              required
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
            />

            <input
              required
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleInputChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              />
              <input
                required
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="zipCode"
                placeholder="Zip code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              />
              <input
                required
                type="text"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              />
            </div>
 
            <div className="pt-2 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod("COD")}
                  className={`p-3 border rounded-xl text-center cursor-pointer font-medium transition ${
                    paymentMethod === "COD"
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  💵 Cash on Delivery
                </div>
                <div
                  onClick={() => setPaymentMethod("ONLINE")}
                  className={`p-3 border rounded-xl text-center cursor-pointer font-medium transition ${
                    paymentMethod === "ONLINE"
                      ? "border-orange-500 bg-orange-50 text-orange-600 font-semibold"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  📱 Pay Online (QR)
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition cursor-pointer text-center"
            >
              {paymentMethod === "ONLINE" ? "Proceed to QR Payment" : "Confirm COD Order"}
            </button>
          </form>
        ) : ( 
          <div className="flex flex-col items-center justify-center text-center space-y-6 border-r border-gray-100 pr-0 md:pr-4">
            <h2 className="text-2xl font-bold text-gray-800">Scan to Pay Online</h2>
            <p className="text-sm text-gray-500 px-4">
              Please open any UPI App (GPay, PhonePe, Paytm) and scan the QR below to pay **₹{grandTotal}**
            </p>
            
         
            <div className="p-4 bg-white border-2 border-dashed border-orange-400 rounded-2xl shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=bankal@upi%26pn=BankalMavi%26am=${grandTotal}%26cu=INR`}
                alt="Payment QR Code Link"
                className="w-48 h-48 rounded-md"
              />
            </div>

            <div className="w-full space-y-3 px-4">
              <button
                onClick={handleOnlinePaymentSuccess}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition cursor-pointer"
              >
                I Have Successfully Paid ✅
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200 transition cursor-pointer"
              >
                ← Back to Change Details
              </button>
            </div>
          </div>
        )}

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart Totals</h2>
          
          <div className="flex justify-between text-gray-600 border-b pb-2">
            <span>Subtotal</span>
            <span>₹{cartSubtotal}</span>
          </div>

          <div className="flex justify-between text-gray-600 border-b pb-2">
            <span>Delivery Fee</span>
            {deliveryCharge === 0 ? (
              <span className="text-green-600 font-semibold">Free Delivery</span>
            ) : (
              <span>₹{deliveryCharge}</span>
            )}
          </div>

          <div className="flex justify-between text-gray-600 border-b pb-2">
            <span>Platform Handling Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <div className="flex justify-between text-gray-800 font-bold text-xl pt-2">
            <span>Total Bill</span>
            <span className="text-green-700">₹{grandTotal}</span>
          </div>

          {deliveryCharge > 0 && (
            <p className="text-xs text-orange-500 bg-orange-50 p-2 rounded-md text-center font-medium">
              💡 Add items worth ₹{500 - cartSubtotal} more to unlock **Free Delivery**!
            </p>
          )}

          <Link to="/cart" className="block text-center text-sm text-gray-400 underline mt-4 hover:text-orange-500">
            Return back to modify cart items
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Checkout;