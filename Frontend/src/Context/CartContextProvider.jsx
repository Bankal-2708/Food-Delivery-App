import { useState, useEffect, useCallback, useRef } from 'react';
import { CartContext } from './cartContext';

// Use Vite environment variable for the backend URL when available.
// Create a local .env file with VITE_API_URL if you want to run on other devices.
const normalizeApiBase = (value) => {
  if (!value) return 'https://food-backend-rouge.vercel.app/api';

  const trimmed = value.trim().replace(/\/+$/, '');
  if (!trimmed) return 'https://food-backend-rouge.vercel.app/api';

  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.endsWith('/api')) return trimmed;

  return `${trimmed}/api`;
};

const API = normalizeApiBase(import.meta.env.VITE_API_URL || 'https://food-backend-rouge.vercel.app/api');

const buildApiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API}${cleanPath}`;
};

const requestJson = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text || 'Request failed' };
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || 'Request failed');
  }

  return data;
};

const CartContextProvider = ({ children }) => {
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

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setDebounce(searchTerm);
    }, 400);

    return () => clearTimeout(debounceTimer.current);
  }, [searchTerm]);

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
          console.error('Load cart error:', err);
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
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ items: cart }),
        });
      } catch (err) {
        console.error('Cart sync failed:', err);
      }
    };

    syncCart();
  }, [cart, token, isInitialLoad, authHeaders]);

  const getItemKey = (itemOrId) => {
    if (!itemOrId) return null;
    if (typeof itemOrId === 'object') {
      return itemOrId._id || itemOrId.id || null;
    }
    return itemOrId;
  };

  const addItemToCart = (item) => {
    if (!token) {
      alert('Please login to add items to your cart!');
      return;
    }

    const itemKey = getItemKey(item);

    setCart((prev) => {
      const exists = prev.find((i) => getItemKey(i) === itemKey);

      if (exists) {
        return prev.map((i) =>
          getItemKey(i) === itemKey ? { ...i, count: (i.count || 0) + 1 } : i
        );
      }

      return [...prev, { ...item, count: 1 }];
    });
  };

  const removeItemFromCart = (itemId) => {
    const itemKey = getItemKey(itemId);

    setCart((prev) => {
      const exists = prev.find((i) => getItemKey(i) === itemKey);

      if (!exists) return prev;

      if ((exists.count || 1) === 1) {
        return prev.filter((i) => getItemKey(i) !== itemKey);
      }

      return prev.map((i) =>
        getItemKey(i) === itemKey ? { ...i, count: (i.count || 1) - 1 } : i
      );
    });
  };

  const clearCart = () => setCart([]);

  const login = async (email, password) => {
    const data = await requestJson(buildApiUrl('/auth/login'), {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const register = async (name, email, password) => {
    const data = await requestJson(buildApiUrl('/auth/register'), {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

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
      console.error('Clear cart error:', err);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');

    setToken('');
    setUser(null);
    setCart([]);
  };

  const forgotPassword = async (email) => {
    return requestJson(buildApiUrl('/auth/forgot-password'), {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const sendOtp = async (email, purpose) => {
    const attempts = [
      { url: buildApiUrl('/auth/send-otp'), body: { email, purpose } },
      { url: buildApiUrl('/auth/sendOtp'), body: { email, purpose } },
      { url: buildApiUrl('/auth/send-otp'), body: { email, type: purpose } },
    ];

    let lastError = new Error('Failed to send OTP');

    for (const attempt of attempts) {
      try {
        return await requestJson(attempt.url, {
          method: 'POST',
          body: JSON.stringify(attempt.body),
        });
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError;
  };

  const verifyOtp = async (email, otp, purpose) => {
    return requestJson(buildApiUrl('/auth/verify-otp'), {
      method: 'POST',
      body: JSON.stringify({ email, otp, purpose }),
    });
  };

  const resetPassword = async (email, otp, newPassword) => {
    return requestJson(buildApiUrl('/auth/reset-password'), {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
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
      sendOtp,
      verifyOtp,
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
