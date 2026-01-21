import Navbar from "./Components/NavBar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Menu from "./Components/Pages/Menu";
import Contact from "./Components/Pages/Contact";
import Mobile from "./Components/Pages/Mobile";
import Cart from "./Components/Pages/Cart";
import CartProvider from "./Context/CartContextProvider";
import Footer from "./Components/Footer/Footer";
import Sidenavbar from "./Components/NavBar/Sidenavbar";

import AuthForm from "./Components/Login Form/AuthForm";
import Privacy from "./Components/Pages/Privacy";
import Delivery from "./Components/Pages/Delivery";
import About from "./Components/Pages/About";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {



  return (
    <div className="m-10">
      <CartProvider>
        <ScrollToTop />
        <Navbar className='sm: hidden'  />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/sideMenu" element={<Sidenavbar />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/authform" element={<AuthForm />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
