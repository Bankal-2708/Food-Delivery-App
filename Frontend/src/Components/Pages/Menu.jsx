import React from 'react'
<<<<<<< HEAD

function Menu() {
  return (
    <div>Menu</div>
=======
import Header from '../Header/Header'
import ExploreMenu from '../Explore Menu/ExploreMenu'
import Dishes from '../Dishes/Dishes'
import { useState } from 'react';
import Apk from '../AppDownload/Apk';


function Menu({searchTerm}) {
  const [category, setCategory] = useState("All");
  return (
    <div className="mt-25">
      <ExploreMenu category={category} setCategory={setCategory} />
      <Dishes category={category} searchTerm={searchTerm} />
      <Apk />
    </div>
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  )
}

export default Menu