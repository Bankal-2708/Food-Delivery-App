import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

 import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer";
import Sidenavbar from "./Components/NavBar/Sidenavbar";

 import Home from "./Components/Pages/Home";
import Menu from "./Components/Pages/Menu";
import Contact from "./Components/Pages/Contact";
import Mobile from "./Components/Pages/Mobile";
import Cart from "./Components/Pages/Cart";
import Checkout from "./Components/Pages/Checkout";
import Payment from "./Components/Pages/Payment";
import Privacy from "./Components/Pages/Privacy";
import Delivery from "./Components/Pages/Delivery";
import About from "./Components/Pages/About";

// Auth & Admin Components
import LoginForm from "./Components/LoginForm/AuthForm";

// Context Provider
import CartProvider from "./Context/CartContextProvider";

// Scroll to Top logic
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CartProvider>
      <ScrollToTop />

      <div className="w-full min-h-screen flex flex-col bg-white">
        <Navbar />

         <div className="w-full  grow">
          <Routes>
             
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sideMenu" element={<Sidenavbar />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/about" element={<About />} />

             
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;