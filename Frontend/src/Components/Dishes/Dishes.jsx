import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContext";

import add from "../../assets/add.png";
import greenAdd from "../../assets/green_add.png";
import minus from "../../assets/minus.png";

function Dishes({ category }) {
  const { cart = [], addItemToCart, removeItemFromCart, debounce } = useContext(CartContext);

  const [dishes, setDishes] = useState([]); 

   useEffect(() => {
    fetch("http://localhost:5000/api/food")
      .then((res) => res.json())
      .then((res) => {
        console.log("API DATA:", res); 
         if (res.success && Array.isArray(res.data)) {
            setDishes(res.data);
        } else {
            console.error("Unexpected API structure:", res);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddItem = (id) => {
    const item = dishes.find((dish) => dish.id === id || dish._id === id);
    if (item) {
      addItemToCart(item);
    }
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };

    const filteredDishes = dishes?.filter((dish) => {
    const matchesCategory = category === "All" || dish.category === category;
    const matchesSearch = dish.name?.toLowerCase().includes((debounce || "").toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <div className="lg:m-7">
      <div className="ml-6">
        <h1 className="font-bold text-3xl">Top dishes near you</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:p-4 pb-5">
        {filteredDishes.map((dish) => {
           const cartItem = Array.isArray(cart) ? cart.find((item) => item.id === dish.id || item._id === dish._id) : null;

          return (
            <div
              key={dish._id || dish.id}
              className="border border-gray-300 rounded-lg p-3 shadow hover:shadow-2xl transition"
            >
              <img
                src={dish.imageUrl ? `http://localhost:5000${dish.imageUrl}` : 'https://via.placeholder.com/200'}
                alt={dish.name}
                className="h-40 w-full object-cover rounded-2xl mt-5"
              />

              <h3 className="mt-2 font-semibold">{dish.name}</h3>
              <p className="text-sm text-gray-500">{dish.description}</p>

              <div className="flex justify-between items-center mt-2">
                <p className="font-bold text-green-600 text-2xl">
                  ₹{dish.price}
                </p>

                <div className="flex justify-between items-center mr-2 pb-0.5">
                  {cartItem ? (
                    <div className="flex items-center gap-3">
                      <img
                        onClick={() => handleRemoveItem(dish._id || dish.id)}
                        src={minus}
                        alt="Remove"
                        className="h-6 w-6 cursor-pointer"
                      />
                      <p className="font-bold text-2xl leading-none">
                        {cartItem.count}
                      </p>
                      <img
                        onClick={() => handleAddItem(dish._id || dish.id)}
                        src={greenAdd}
                        alt="Add"
                        className="h-6 w-6 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <img
                      onClick={() => handleAddItem(dish._id || dish.id)}
                      src={add}
                      alt="Add"
                      className="h-6 w-6 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dishes;