import React, { useContext } from "react";
import Pizza from "../../assets/Pizza_1.jpeg";
import Dosa from "../../assets/Dosa.jpeg";
import Momos from "../../assets/Momos_1.jpeg";
import Panner_Nan from "../../assets/Panner_Nan.jpeg";
import Panner_Tikka from "../../assets/Panner_Tikka.jpeg";
import Pav_Bhaji from "../../assets/Pav_Bhaji.jpeg";
import Rajma_Rice from "../../assets/Rajma_Rice.jpeg";
import Sandwhich from "../../assets/Sandwich.jpeg";
import Rating from "../../assets/Rating.jpeg";
import Burgur from "../../assets/Burgur_1.jpeg";
import Chola_Bhutura from "../../assets/Chola_bhutara.jpeg";
import Egg_Biryani from "../../assets/Egg_Biryani.jpeg";
import Mix_Momo from "../../assets/Mix_Momo.jpeg";
import Pasta from "../../assets/Paasta.jpeg";
import Rice_Kheer from "../../assets/Rice_Kheer.jpeg";
import add from "../../assets/add.png";
import greenAdd from "../../assets/green_add.png";
import minus from "../../assets/minus.png";
import { CartContext } from "../../Context/cartContext";

const dishes = [
  {
    id: 1,
    name: "Pizza",
    img: Pizza,
    price: "$10",
    Rating: Rating,
    description: "Cheesy pizza topped with fresh vegetables and herbs",
    count: 0,
  },
  {
    id: 2,
    name: "Dosa",
    img: Dosa,
    price: "$6",
    Rating: Rating,
    description: "Crispy South Indian dosa served with chutney and sambar",
    count: 0,
  },
  {
    id: 3,
    name: "Momos",
    img: Momos,
    price: "$5",
    Rating: Rating,
    description: "Steamed momos stuffed with spicy vegetable filling",
    count: 0,
  },
  {
    id: 4,
    name: "Paneer Nan",
    img: Panner_Nan,
    price: "$8",
    Rating: Rating,
    description: "Soft naan bread stuffed with seasoned paneer",
    count: 0,
  },
  {
    id: 5,
    name: "Paneer Tikka",
    img: Panner_Tikka,
    price: "$9",
    Rating: Rating,
    description: "Grilled paneer cubes marinated in Indian spices",
    count: 0,
  },
  {
    id: 6,
    name: "Pav Bhaji",
    img: Pav_Bhaji,
    price: "$7",
    Rating: Rating,
    description: "Spicy mashed vegetable curry served with buttered pav",
    count: 0,
  },
  {
    id: 7,
    name: "Rajma Rice",
    img: Rajma_Rice,
    price: "$6",
    Rating: Rating,
    description: "Red kidney bean curry served with steamed rice",
    count: 0,
  },
  {
    id: 8,
    name: "Sandwich",
    img: Sandwhich,
    price: "$4",
    Rating: Rating,
    description: "Grilled vegetable sandwich with cheese and sauces",
    count: 0,
  },
  {
    id: 9,
    name: "Burger",
    img: Burgur,
    price: "$7",
    Rating: Rating,
    description: "Juicy burger with fresh veggies and special sauce",
    count: 0,
  },
  {
    id: 10,
    name: "Chole Bhature",
    img: Chola_Bhutura,
    price: "$8",
    Rating: Rating,
    description: "Spicy chickpea curry served with fluffy fried bhature",
    count: 0,
  },
  {
    id: 11,
    name: "Egg Biryani",
    img: Egg_Biryani,
    price: "$9",
    Rating: Rating,
    description: "Aromatic basmati rice cooked with eggs and spices",
    count: 0,
  },
  {
    id: 12,
    name: "Mix Momos",
    img: Mix_Momo,
    price: "$6",
    Rating: Rating,
    description: "Assorted momos with mixed vegetable stuffing",
    count: 0,
  },
  {
    id: 13,
    name: "Pasta",
    img: Pasta,
    price: "$7",
    Rating: Rating,
    description: "Creamy pasta tossed with herbs and vegetables",
    count: 0,
  },
  {
    id: 14,
    name: "Rice Kheer",
    img: Rice_Kheer,
    price: "$5",
    Rating: Rating,
    description: "Traditional sweet rice pudding flavored with cardamom",
    count: 0,
  },
];

function Dishes() {
  const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const handleAddItem = (id) => {
    const item = dishes.find((dish) => dish.id === id);
    addItemToCart(item); 
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };

  return (
    <div className="m-7">
      <div className="ml-6">
        <h1 className="font-bold text-3xl">Top dishes near you</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="border border-gray-300 rounded-lg p-3 shadow hover:shadow-2xl transition"
          >
            <img
              src={dish.img}
              alt={dish.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{dish.name}</h3>
            <p>{dish.description}</p>
            <p className="font-bold text-green-600 text-2xl">{dish.price}</p>

            <div className="flex justify-between">
              {/* Check if the dish is already in the cart */}
              {cart.some((item) => item.id === dish.id) ? (
                <div className="flex items-center gap-3">
                  <img
                    onClick={() => handleRemoveItem(dish.id)}
                    src={minus}
                    alt="Remove"
                    className="h-4 w-4 cursor-pointer"
                  />
                  {/* Find the count of the item in the cart */}
                  <p>{cart.find((item) => item.id === dish.id)?.count}</p>
                  <img
                    onClick={() => handleAddItem(dish.id)}
                    src={greenAdd}
                    alt="Add"
                    className="h-4 w-4 cursor-pointer"
                  />
                </div>
              ) : (
                <img
                  onClick={() => handleAddItem(dish.id)}
                  src={add}
                  alt="Add"
                  className="h-5 w-5 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dishes;