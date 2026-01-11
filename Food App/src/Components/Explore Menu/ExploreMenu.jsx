// import React, { useState } from "react";
import Biryani from "../../assets/Biryani.jpeg";
import Chicken from "../../assets/Chicken.jpeg";
import Burgur from "../../assets/Burgur.jpeg";
import Idlie from "../../assets/Idlie.jpeg";
import Noodles from "../../assets/Noodles.jpeg";
import Panner_Roll from "../../assets/Panner Roll.jpeg";
import Rabri from "../../assets/Rabri.jpeg";
import Pizza from "../../assets/Pizza.jpeg";
import Pasta from "../../assets/Pasta.jpeg";
import Paratha from "../../assets/Paratha.jpeg";
import Butter_Nan from "../../assets/Butter Nan.jpeg";
import Momos from "../../assets/Momos.jpeg";

const menuItems = [
  { id: 1, name: "Biryani", img: Biryani },
  { id: 2, name: "Chicken", img: Chicken },
  { id: 3, name: "Burger", img: Burgur },
  { id: 4, name: "Idli", img: Idlie },
  { id: 5, name: "Noodles", img: Noodles },
  { id: 6, name: "Paneer Roll", img: Panner_Roll },
  { id: 7, name: "Rabri", img: Rabri },
  { id: 8, name: "Pizza", img: Pizza },
  { id: 9, name: "Pasta", img: Pasta },
  { id: 10, name: "Paratha", img: Paratha },
  { id: 11, name: "Butter Nan", img: Butter_Nan },
  { id: 12, name: "Momos", img: Momos },
];

function ExploreMenu({ category, setCategory }) {
  // const scroolClass=({isActive})=>
  // isActive
  // ? "border-1-orange"
  // : "border-none"

  // const [ActiveId, setActiveId] = useState("null");

  return (
    <div className="mx-10 mt-10 flex flex-col gap-10">
      <div
        className="flex flex-col gap-5 w-full md:max-w-[50%] ml-3
                items-center text-center
                md:items-start md:text-left md:mx-0"
      >
        <h1 className="text-4xl font-bold">Explore our menu</h1>
        <p className="text-xl  ">
          Choose from a diverse meanu featureing a detectable array of dishes.
          Our mission is to satisfy your craving and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
      <div className="flex gap-20 overflow-x-scroll px-4 py-2">
        {menuItems.map((item) => (
          <div key={item.id} className="shrink-0 flex flex-col items-center">
            <img
              src={item.img}
              alt={item.name}
              // className=""
              onClick={() =>
                setCategory(prev =>
                  prev === item.name ? "All" : item.name
                )
              }

              className={`w-full h-40 object-cover rounded-full cursor-pointer
                  ${category === item.name ? "border-6 border-orange-700" : ""}`}

            />
            <p className="mt-3 font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="border-t-4 border-gray-400 mx-1 rounded-full" />
    </div>
  );
}

export default ExploreMenu;
