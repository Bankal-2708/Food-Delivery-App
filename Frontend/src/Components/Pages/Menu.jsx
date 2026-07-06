import React from 'react'
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
  )
}

export default Menu