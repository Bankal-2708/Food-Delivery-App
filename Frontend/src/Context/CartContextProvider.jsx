import { useState, useEffect, useCallback, useRef } from 'react';
import { CartContext } from './cartContext';

<<<<<<< HEAD
const API = 'https://food-backend-rouge.vercel.app/api';

const CartContextProvider = ({ children }) => {

=======
const API = 'http://localhost:5000/api';

const CartContextProvider = ({ children }) => {

  // --- STATE ---
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [debounce, setDebounce] = useState('');
  const debounceTimer = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

<<<<<<< HEAD
  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'token': token,
  }), [token]);

  // Debounce search
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebounce(searchTerm), 400);
    return () => clearTimeout(debounceTimer.current);
  }, [searchTerm]);

  useEffect(() => {
=======
   const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }), [token]);

  // debouncing search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setDebounce(searchTerm);
    }, 400);

    return () => clearTimeout(debounceTimer.current);
  }, [searchTerm]);

  
   useEffect(() => {
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    const loadData = async () => {
      if (token) {
        const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (savedUser) setUser(savedUser);

        try {
<<<<<<< HEAD
          const res = await fetch(`${API}/cart`, { headers: authHeaders() });

          if (res.status === 401) {
            console.warn("Unauthorized: Session might be expired.");
            return;
          }

          const resData = await res.json();
          if (resData.success && resData.data) {
            setCart(resData.data);
=======
          const res = await fetch(`${API}/cart`, {
            headers: authHeaders(),
          });

          const data = await res.json();

          if (data.items) {
            setCart(data.items);  
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
          }
        } catch (err) {
          console.error("Load cart error:", err);
        }
      }
<<<<<<< HEAD
=======

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
      setIsInitialLoad(false);
    };

    loadData();
  }, [token, authHeaders]);

<<<<<<< HEAD
=======
   
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

<<<<<<< HEAD
=======
   
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  useEffect(() => {
    if (!token || isInitialLoad) return;

    const syncCart = async () => {
      try {
        await fetch(`${API}/cart`, {
<<<<<<< HEAD
          method: 'POST',
=======
          method: 'POST', 
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
          headers: authHeaders(),
          body: JSON.stringify({ items: cart }),
        });
      } catch (err) {
        console.error("Cart sync failed:", err);
      }
    };

    syncCart();
  }, [cart, token, isInitialLoad, authHeaders]);

<<<<<<< HEAD
=======
  
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  const addItemToCart = (item) => {
    if (!token) {
      alert("Please login to add items to your cart!");
      return;
    }
<<<<<<< HEAD
    setCart((prev) => {
      const itemId = item._id || item.id;
      const exists = prev.find((i) => (i._id || i.id) === itemId);
      if (exists) return prev.map((i) => (i._id || i.id) === itemId ? { ...i, count: i.count + 1 } : i);
      const normalized = { _id: itemId, name: item.name, price: item.price, image: item.image, imageSrc: item.imageSrc || item.img, count: 1 };
      return [...prev, normalized];
=======

    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      }

      return [...prev, { ...item, count: 1 }];
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    });
  };

  const removeItemFromCart = (itemId) => {
    setCart((prev) => {
<<<<<<< HEAD
      const exists = prev.find((i) => (i._id || i.id) === itemId);
      if (!exists) return prev;
      if (exists.count === 1) return prev.filter((i) => (i._id || i.id) !== itemId);
      return prev.map((i) => (i._id || i.id) === itemId ? { ...i, count: i.count - 1 } : i);
=======
      const exists = prev.find((i) => i.id === itemId);

      if (!exists) return prev;

      if (exists.count === 1) {
        return prev.filter((i) => i.id !== itemId);
      }

      return prev.map((i) =>
        i.id === itemId ? { ...i, count: i.count - 1 } : i
      );
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    });
  };

  const clearCart = () => setCart([]);

<<<<<<< HEAD
=======
   
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
<<<<<<< HEAD
    if (!res.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('token', data.token);
    const userData = data.user || data.name;
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(data.token);
    setUser(userData);
=======

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281

    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
<<<<<<< HEAD
    if (!res.ok) throw new Error(data.message || 'Registration failed');

    localStorage.setItem('token', data.token);
    const userData = data.user || data.name;
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(data.token);
    setUser(userData);
=======

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281

    return data;
  };

<<<<<<< HEAD
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
=======
  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API}/cart/clear`, {
          method: 'POST',
          headers: authHeaders(),
        });
      }
    } catch (err) {
      console.error("Clear cart error:", err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    setToken('');
    setUser(null);
    setCart([]);
  };

<<<<<<< HEAD
=======
 
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
  const forgotPassword = async (email) => {
    const res = await fetch(`${API}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
<<<<<<< HEAD
    if (!res.ok) throw new Error(data.message || 'Request failed');
=======

    if (!res.ok) throw new Error(data.message);

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    return data;
  };

  const resetPassword = async (resetToken, newPassword) => {
    const res = await fetch(`${API}/auth/reset-password/${resetToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    const data = await res.json();
<<<<<<< HEAD
    if (!res.ok) throw new Error(data.message || 'Reset failed');
=======

    if (!res.ok) throw new Error(data.message);

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
    return data;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItemToCart,
      removeItemFromCart,
      clearCart,
<<<<<<< HEAD
=======

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
      user,
      token,
      login,
      register,
      logout,
<<<<<<< HEAD
      forgotPassword,
      resetPassword,
=======

      forgotPassword,
      resetPassword,

>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
      searchTerm,
      setSearchTerm,
      debounce,
    }}>
      {children}
    </CartContext.Provider>
  );
};

<<<<<<< HEAD
export default CartContextProvider;
=======
export default CartContextProvider;
>>>>>>> 7dbdd5acc13454d943579490d8e995784acb0281
