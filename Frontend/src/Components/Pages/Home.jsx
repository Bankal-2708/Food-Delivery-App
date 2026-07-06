<<<<<<< HEAD
=======

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
import Header from '../Header/Header'
import ExploreMenu from '../Explore Menu/ExploreMenu'
import Dishes from '../Dishes/Dishes'
import { useState } from 'react';
import Apk from '../AppDownload/Apk';

function Home({ searchTerm }) {
    const [category, setCategory] = useState("All");
  return (
<<<<<<< HEAD
    <div className="w-full flex flex-col bg-white">
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
        <Dishes category={category} searchTerm={searchTerm}/>
        <Apk/>
=======
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory} />
      <Dishes category={category} searchTerm={searchTerm}/>
      <Apk/>

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    </div>
  )
}

<<<<<<< HEAD
export default Home;
=======
export default Home
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
