import React, { useContext } from "react";
import { CartContext } from "../../Context/cartContext";
import minus from "../../assets/minus.png";
import greenAdd from "../../assets/green_add.png";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, addItemToCart, removeItemFromCart, clearCart } = useContext(CartContext);

  const filteredItems = cart.filter((item) => item.count > 0);

  const totalPrice = filteredItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace("$", ""));
    return acc + price * item.count;
  }, 0);

  const handleAddItem = (id) => {
    const item = cart.find((dish) => dish.id === id);
    addItemToCart(item);
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };





  return (
    <div className="p-8 pt-15 md:pt-30 max-w-4xl mx-auto">
      <h1 className="text-4xl py-1 font-bold mb-6 w-full  hover:bg-gray-200  rounded-4xl text-center ">Your Shopping Cart</h1>

      {filteredItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-2xl ">Your cart is empty!</p>
          <a href="/" className="text-blue-500 underline mt-4 text-2xl inline-block">
            Go back to menu
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">Price: {item.price}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-4">
                  <img
                    src={minus}
                    alt="Remove"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                  <p className="font-bold text-lg">{item.count}</p>
                  <img
                    src={greenAdd}
                    alt="Add"
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => handleAddItem(item.id)}
                  />
                </div>

                <p className="text-green-600 font-bold mt-2">
                  Subtotal: $
                  {parseInt(item.price.replace("$", "")) * item.count}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-8 border-t pt-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total Bill:</h2>
            <p className="text-2xl font-bold text-green-700">${totalPrice}</p>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600">
            Proceed to Checkout
          </button>
          <div>
            <Link to='/'>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600">
                Go To Home
              </button>
            </Link>
          </div>
          <button onClick={clearCart}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
