import React from "react";

import Biryani from "../../assets/Biryani.jpeg";
import Chicken from "../../assets/Chicken.jpeg";
import Burgur from "../../assets/Burgur.jpeg";
import Dosa from "../../assets/Dosa.jpeg";
import Panner_Roll from "../../assets/Panner Roll.jpeg";
import Rabri from "../../assets/Rabri.jpeg";
import Pizza from "../../assets/Pizza.jpeg";
import Pasta from "../../assets/Pasta.jpeg";
import Paratha from "../../assets/Paratha.jpeg";
import Momos from "../../assets/Momos.jpeg";
import Butter_Nan from "../../assets/Butter Nan.jpeg";
import Idlie from "../../assets/Idlie.jpeg";

const menuItems = [
  { id: 1, name: "Biryani", img: Biryani },
  { id: 2, name: "Chicken", img: Chicken },
  { id: 3, name: "Burger", img: Burgur },
  { id: 4, name: "Dosa", img: Dosa },
  { id: 5, name: "Paneer Roll", img: Panner_Roll },
  { id: 6, name: "Rabri", img: Rabri },
  { id: 7, name: "Pizza", img: Pizza },
  { id: 8, name: "Pasta", img: Pasta },
  { id: 9, name: "Paratha", img: Paratha },
  { id: 10, name: "Momos", img: Momos },
  { id: 11, name: "Butter Nan", img: Butter_Nan },
  { id: 4, name: "Idli", img: Idlie },
];

function ExploreMenu({ category, setCategory }) {
  return (
    <div id="menu" className="w-full mt-15 flex flex-col gap-10 px-6 md:px-16 bg-white">
      <div className="flex flex-col gap-5 w-full md:max-w-[50%] items-start text-left md:mx-0">
        <h1 className="text-4xl font-bold text-gray-900">Explore our menu</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.
        </p>
      </div>

      <div className="flex gap-20 overflow-x-scroll px-4 py-2 scrollbar-thin">
        {menuItems.map((item) => (
          <div key={item.id} className="shrink-0 flex flex-col items-center">
            <div className="w-40 h-40">
              <img
                src={item.img}
                alt={item.name}
                onClick={() => setCategory((prev) => (prev === item.name ? "All" : item.name))}
                className={`w-full h-full object-cover rounded-full cursor-pointer transition duration-200 ${category === item.name ? "border-6 border-orange-700" : ""}`}
              />
            </div>
            <p className="mt-3 font-semibold text-gray-800">{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="border-t-4 border-gray-400 mx-1 rounded-full w-full" />
    </div>
  );
}

export default ExploreMenu;
