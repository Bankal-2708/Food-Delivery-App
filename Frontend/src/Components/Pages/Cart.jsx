import React, { useContext } from "react";
import { CartContext } from "../../Context/cartContext";
import minus from "../../assets/minus.png";
import greenAdd from "../../assets/green_add.png";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, addItemToCart, removeItemFromCart, clearCart } = useContext(CartContext);

  const filteredItems = cart.filter((item) => item.count > 0);

  const totalPrice = filteredItems.reduce((acc, item) => {
    const price = parseFloat(String(item.price).replace("$", "").replace("₹", ""));
    return acc + price * item.count;
  }, 0);

  const handleAddItem = (id) => {
    const item = cart.find((dish) => (dish._id || dish.id) === id);
    if (item) addItemToCart(item);
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };

  return (
    <div className="w-full min-h-screen bg-white pt-32 pb-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl py-1 font-bold mb-6 w-full text-center">
          Your Shopping Cart
        </h1>

        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-2xl">Your cart is empty!</p>
            <Link to="/" className="text-blue-500 underline mt-4 text-2xl inline-block">
              Go back to menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className="flex items-center justify-between border-b pb-4 bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageSrc || item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">Price: ₹{parseFloat(item.price)}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-4 justify-end">
                    <img
                      src={minus}
                      alt="Remove"
                      className="h-5 w-5 cursor-pointer select-none"
                      onClick={() => handleRemoveItem(item._id || item.id)}
                    />
                    <p className="font-bold text-lg text-gray-800 select-none">{item.count}</p>
                    <img
                      src={greenAdd}
                      alt="Add"
                      className="h-5 w-5 cursor-pointer select-none"
                      onClick={() => handleAddItem(item._id || item.id)}
                    />
                  </div>

                  <p className="text-green-600 font-bold mt-2">
                    Subtotal: ₹
                    {parseFloat(String(item.price).replace("$", "").replace("₹", "")) * item.count}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-8 border-t pt-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">Total Bill:</h2>
              <p className="text-2xl font-bold text-green-700">₹{totalPrice}</p>
            </div>

            <button
              onClick={() => navigate('/checkout', { state: { amount: totalPrice } })}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600 cursor-pointer text-center block"
            >
              Proceed to Checkout
            </button>

            <div>
              <Link to='/'>
                <button
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600 cursor-pointer">
                  Go To Home
                </button>
              </Link>
            </div>

            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold mt-4 hover:bg-gray-300 cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;