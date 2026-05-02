import { useContext, useState } from 'react';
import { CartContext } from '../../Context/cartContext';

const AuthForm = ({ setShowLogin }) => {
  const { login, register } = useContext(CartContext);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      if (setShowLogin) setShowLogin(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto relative">
      {setShowLogin && (
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none"
        >
          ✕
        </button>
      )}

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {mode === 'login' ? 'Welcome Back 👋' : 'Create Account 🍽️'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 py-2 px-3 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-lg disabled:opacity-60"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <p
        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
        className="text-center mt-5 text-sm text-gray-500 cursor-pointer hover:text-orange-500"
      >
        {mode === 'login'
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Login'}
      </p>
    </div>
  );

  if (setShowLogin) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}
      >
        {formContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
      {formContent}
    </div>
  );
};

export default AuthForm;