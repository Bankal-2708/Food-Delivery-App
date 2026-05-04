import { useState, useEffect, useCallback, useRef } from 'react';
import { CartContext } from './cartContext';

const API = 'http://localhost:5000/api';

const CartContextProvider = ({ children }) => {

  // --- STATE ---
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [debounce, setDebounce] = useState('');
  const debounceTimer = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  
  // load cart and user data on initial app load
  useEffect(() => {
    const loadData = async () => {
      if (token) {
        const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (savedUser) setUser(savedUser);

        try {
          const res = await fetch(`${API}/cart`, {
            headers: authHeaders(),
          });

          const data = await res.json();

          if (data.items) {
            setCart(data.items);  
          }
        } catch (err) {
          console.error("Load cart error:", err);
        }
      }

      setIsInitialLoad(false);
    };

    loadData();
  }, [token, authHeaders]);

   
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

   
  useEffect(() => {
    if (!token || isInitialLoad) return;

    const syncCart = async () => {
      try {
        await fetch(`${API}/cart`, {
          method: 'POST', // or PUT based on backend
          headers: authHeaders(),
          body: JSON.stringify({ items: cart }),
        });
      } catch (err) {
        console.error("Cart sync failed:", err);
      }
    };

    syncCart();
  }, [cart, token, isInitialLoad, authHeaders]);

  
  const addItemToCart = (item) => {
    if (!token) {
      alert("Please login to add items to your cart!");
      return;
    }

    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      }

      return [...prev, { ...item, count: 1 }];
    });
  };

  const removeItemFromCart = (itemId) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === itemId);

      if (!exists) return prev;

      if (exists.count === 1) {
        return prev.filter((i) => i.id !== itemId);
      }

      return prev.map((i) =>
        i.id === itemId ? { ...i, count: i.count - 1 } : i
      );
    });
  };

  const clearCart = () => setCart([]);

   
  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

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

    setToken('');
    setUser(null);
    setCart([]);
  };

 
  const forgotPassword = async (email) => {
    const res = await fetch(`${API}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  };

  const resetPassword = async (resetToken, newPassword) => {
    const res = await fetch(`${API}/auth/reset-password/${resetToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItemToCart,
      removeItemFromCart,
      clearCart,

      user,
      token,
      login,
      register,
      logout,

      forgotPassword,
      resetPassword,

      searchTerm,
      setSearchTerm,
      debounce,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;