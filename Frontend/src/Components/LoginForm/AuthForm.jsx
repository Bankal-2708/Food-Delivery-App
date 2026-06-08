import { useContext, useState } from 'react';
import { CartContext } from '../../Context/cartContext';

const AuthForm = ({ setShowLogin }) => {
  const { login, register, forgotPassword, resetPassword } = useContext(CartContext);
  const [mode, setMode] = useState('login'); 
  const [isResetting, setIsResetting] = useState(false);  
  const [activeResetToken, setActiveResetToken] = useState('');  
  
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
        if (setShowLogin) setShowLogin(false);
      } else if (mode === 'register') {
        await register(form.name, form.email, form.password);
        if (setShowLogin) setShowLogin(false);
      } else {
 
        if (!isResetting) {
          const data = await forgotPassword(form.email);
          setActiveResetToken(data.resetToken);
          setIsResetting(true);  
          setMessage('Email verified. Enter your new password below.');
        } else {
          await resetPassword(activeResetToken, form.password);
          setMessage('Password updated successfully! You can now login.');
          setMode('login');
          setIsResetting(false);
          setForm({ ...form, password: '' });
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto relative border border-gray-100">
      {setShowLogin && (
        <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">✕</button>
      )}

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {mode === 'login' ? 'Welcome Back 👋' : mode === 'register' ? 'Create Account 🍽️' : isResetting ? 'Set New Password 🔒' : 'Verify Email 📧'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-400 outline-none"
          />
        )}
        
         {!isResetting && (
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-400 outline-none"
          />
        )}

         {(mode !== 'forgot' || isResetting) && (
          <input
            type="password"
            placeholder={isResetting ? "New Password" : "Password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-orange-400 outline-none"
          />
        )}

        {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 px-3 rounded-lg">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center bg-green-50 py-2 px-3 rounded-lg">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors text-lg cursor-pointer"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : isResetting ? 'Update Password' : 'Verify Email'}
        </button>
      </form>

      {mode === 'login' && (
        <p onClick={() => { setMode('forgot'); setIsResetting(false); setError(''); setMessage(''); }} className="text-center mt-3 text-xs text-gray-400 cursor-pointer hover:text-orange-500 underline">
          Forgot Password?
        </p>
      )}

      <p
        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setIsResetting(false); setError(''); setMessage(''); }}
        className="text-center mt-5 text-sm text-gray-500 cursor-pointer hover:text-orange-500"
      >
        {mode === 'login' ? "Don't have an account? Sign Up" : 'Back to Login'}
      </p>
    </div>
  );

  return setShowLogin ? (
    <div className="fixed inset-0 z-[100] w-full min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}>{formContent}</div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-32 px-4">{formContent}</div>
  );
};

export default AuthForm;