import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContext";

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
import add from "../../assets/add.png";
import greenAdd from "../../assets/green_add.png";
import minus from "../../assets/minus.png";

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

function Dishes({ category }) {
  const { cart = [], addItemToCart, removeItemFromCart, debounce } = useContext(CartContext);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("https://food-backend-git-main-bankal2708s-projects.vercel.app/api/food")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setDishes(res.data);
        } else {
          console.error("Unexpected API structure:", res);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddItem = (_id) => {
    const item = dishes.find((dish) => dish._id === _id);
    if (item) {
const resolvedImg = item.imageUrl
         ? `https://food-backend-git-main-bankal2708s-projects.vercel.app${item.imageUrl}`
         : nameImageMap[item.name];

      const itemWithImage = {
        ...item,
        imageSrc: resolvedImg
      };
      addItemToCart(itemWithImage);
    }
  };

  const handleRemoveItem = (_id) => {
    removeItemFromCart(_id);
  };

  const filteredDishes = dishes?.filter((dish) => {
    const matchesCategory = category === "All" || dish.category === category;
    const matchesSearch = dish.name?.toLowerCase().includes((debounce || "").toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <div className="w-full px-6 md:px-16 py-8 bg-white">
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-900">Top dishes near you</h1>
      </div>
       <div className="max-h-[75vh] overflow-y-auto pr-2 scrollbar-none style-scroll">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-5">
          {filteredDishes.map((dish) => {
            const cartItem = Array.isArray(cart) ? cart.find((item) => (item._id || item.id) === dish._id) : null;
            const finalImageSource = dish.imageUrl
              ? `https://food-backend-git-main-bankal2708s-projects.vercel.app${dish.imageUrl}`
              : nameImageMap[dish.name];

            return (
              <div
                key={dish._id}
                className="border border-gray-300 rounded-lg p-3 shadow hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-white flex flex-col justify-between"
              >
                <div>
<img
                         src={dish.imageUrl
                           ? `https://food-backend-git-main-bankal2708s-projects.vercel.app${dish.imageUrl}`
                           : nameImageMap[dish.name]
                         }
                         alt={dish.name}
                    className="h-40 w-full object-cover rounded-2xl mt-2"
                  />
                  <h3 className="mt-2 font-semibold text-gray-800">{dish.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{dish.description}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="font-bold text-green-600 text-2xl">
                    ₹{dish.price}
                  </p>

                  <div className="flex items-center pb-0.5">
                    {cartItem ? (
                      <div className="flex items-center gap-3">
                        <img
                          onClick={() => handleRemoveItem(dish._id)}
                          src={minus}
                          alt="Remove"
                          className="h-6 w-6 cursor-pointer select-none"
                        />
                        <p className="font-bold text-2xl leading-none text-gray-800 select-none">
                          {cartItem.count}
                        </p>
                        <img
                          onClick={() => handleAddItem(dish._id)}
                          src={greenAdd}
                          alt="Add"
                          className="h-6 w-6 cursor-pointer select-none"
                        />
                      </div>
                    ) : (
                      <img
                        onClick={() => handleAddItem(dish._id)}
                        src={add}
                        alt="Add"
                        className="h-6 w-6 cursor-pointer select-none"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dishes;
