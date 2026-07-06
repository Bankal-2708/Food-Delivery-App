import React, { useContext } from "react";
import { CartContext } from "../../Context/cartContext";
import minus from "../../assets/minus.png";
import greenAdd from "../../assets/green_add.png";
import { Link, useNavigate } from "react-router-dom";

<<<<<<< HEAD
 
import Pizza from "../../assets/Pizza_1.jpeg";
import Dosa from "../../assets/Dosa.jpeg";
import Momos from "../../assets/Momos_1.jpeg";
import Panner_Nan from "../../assets/Panner_Nan.jpeg";
import Panner_Tikka from "../../assets/Panner_Tikka.jpeg";
import Pav_Bhaji from "../../assets/Pav_Bhaji.jpeg";
import Rajma_Rice from "../../assets/Rajma_Rice.jpeg";
import Sandwich from "../../assets/Sandwich.jpeg";
import Burgur from "../../assets/Burgur_1.jpeg";
import Chola_Bhutura from "../../assets/Chola_bhutara.jpeg";
import Egg_Biryani from "../../assets/Egg_Biryani.jpeg";
import Mix_Momo from "../../assets/Mix_Momo.jpeg";
import Pasta from "../../assets/Paasta.jpeg";
import Rice_Kheer from "../../assets/Rice_Kheer.jpeg";

const nameImageMap = {
  "Pizza": Pizza,
  "Dosa": Dosa,
  "Momos": Momos,
  "Paneer Nan": Panner_Nan,
  "Paneer Tikka": Panner_Tikka,
  "Pav Bhaji": Pav_Bhaji,
  "Rajma Rice": Rajma_Rice,
  "Sandwich": Sandwich,
  "Burger": Burgur,
  "Chole Bhature": Chola_Bhutura,
  "Egg Biryani": Egg_Biryani,
  "Mix Momos": Mix_Momo,
  "Pasta": Pasta,
  "Rice Kheer": Rice_Kheer,
};

=======
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
function Cart() {
  const navigate = useNavigate();
  const { cart, addItemToCart, removeItemFromCart, clearCart } = useContext(CartContext);

  const filteredItems = cart.filter((item) => item.count > 0);

  const totalPrice = filteredItems.reduce((acc, item) => {
<<<<<<< HEAD
    const price = parseFloat(String(item.price).replace("$", "").replace("₹", ""));
=======
    const price = parseInt(item.price.replace("$", ""));
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    return acc + price * item.count;
  }, 0);

  const handleAddItem = (id) => {
<<<<<<< HEAD
    const item = cart.find((dish) => (dish._id || dish.id) === id);
    if (item) {
      const preservedItem = {
        ...item,
        img: item.img || item.imageSrc
      };
      addItemToCart(preservedItem);
    }
=======
    const item = cart.find((dish) => dish.id === id);
    addItemToCart(item);
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };

  return (
<<<<<<< HEAD
    <div className="w-full min-h-screen bg-white pt-39 pb-16 px-6 md:px-16">
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
            {filteredItems.map((item) => {
              
              const currentImageSource = item.imageSrc || item.image || nameImageMap[item.name] || (item.imageUrl ? `https://food-backend-rouge.vercel.app${item.imageUrl}` : "");

              return (
                <div
                  key={item._id || item.id}
                  className="flex items-center justify-between border-b pb-4 bg-white"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={currentImageSource}
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
              );
            })}

            <div className="mt-8 border-t pt-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">Total Bill:</h2>
              <p className="text-2xl font-bold text-green-700">₹{totalPrice}</p>
            </div>

            <button
              onClick={() => navigate('/checkout', { state: { amount: totalPrice } })}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600 hover:scale-105 transition-transform duration-300 cursor-pointer text-center block"
            >
              Proceed to Checkout
            </button>

            <div>
              <Link to='/'>
                <button
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600 hover:scale-105 transition-transform duration-300 cursor-pointer text-center block">
                  Go To Home
                </button>
              </Link>
            </div>

            <button
              onClick={clearCart}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-grorangeeen-600 hover:scale-105 transition-transform duration-300 cursor-pointer text-center block"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
=======
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

          <button
            onClick={() => navigate('/checkout', { state: { amount: totalPrice } })}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600"
          >
            Proceed to Checkout
          </button>
          <div>
            <Link to='/'>
              <button
                onClick={() => navigate('/payment', { state: { amount: totalPrice } })}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold mt-4 hover:bg-orange-600">
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
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    </div>
  );
}

<<<<<<< HEAD
export default Cart;
=======
export default Cart;
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
