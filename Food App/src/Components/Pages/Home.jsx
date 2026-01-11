
import Header from '../Header/Header'
import ExploreMenu from '../Explore Menu/ExploreMenu'
import Dishes from '../Dishes/Dishes'
import { useState } from 'react';
import Apk from '../AppDownload/Apk';

function Home() {
    const [category, setCategory] = useState("All");
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
      <Dishes category={category} />
      <Apk/>

    </div>
  )
}

export default Home