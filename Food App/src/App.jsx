import Navbar from "./Components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Menu from "./Components/Pages/Menu";
import Contact from "./Components/Pages/Contact";
import Mobile from "./Components/Pages/Mobile";
import Cart from "./Components/Pages/Cart";
import CartProvider from "./Context/CartContextProvider";

function App() {
  return (
    <div className="m-10">
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
