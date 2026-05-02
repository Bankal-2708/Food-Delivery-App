import { useState, useEffect, useCallback, useRef } from 'react';
import { CartContext } from './cartContext';

const API = 'http://localhost:5000/api';

const CartContextProvider = ({ children }) => {

   const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [debounce, setDebounce] = useState('');
  const debounceTimer = useRef(null);

  const skipNextSync = useRef(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebounce(searchTerm);
    }, 400);
    return () => clearTimeout(debounceTimer.current);
  }, [searchTerm]);

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }), [token]);

   useEffect(() => {
    const loadData = async () => {
      if (token) {
        const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (savedUser) setUser(savedUser);

        try {
          const res = await fetch(`${API}/cart`, { headers: authHeaders() });
          const data = await res.json();

          if (data.items && data.items.length > 0) {
             skipNextSync.current = true;
            setCart(data.items);
            localStorage.setItem('cart', JSON.stringify(data.items));
          } 
         
        } catch (error) {
          console.error('Failed to fetch cart', error);
        }
      } else {
        setCart([]);
        setUser(null);
      }
      setIsInitialLoad(false);
    };
    loadData();
  }, [token, authHeaders]);

   useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

   useEffect(() => {
    if (isInitialLoad || !token) return;

    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }

    fetch(`${API}/cart`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ items: cart }),
    }).catch((err) => console.error('Sync error:', err));

  }, [cart, token, isInitialLoad, authHeaders]);

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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // ✅ important

    setToken('');
    setUser(null);
    setCart([]);
  };

  const addItemToCart = (item) => {
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
      if (exists.count === 1)
        return prev.filter((i) => i.id !== itemId);
      return prev.map((i) =>
        i.id === itemId ? { ...i, count: i.count - 1 } : i
      );
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItemToCart,
      removeItemFromCart,
      clearCart: () => setCart([]),
      user,
      token,
      login,
      register,
      logout,
      searchTerm,
      setSearchTerm,
      debounce,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;