import React, { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginForm({ ...loginForm, [name]: value });
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      login(userCredential.user);
      onClose();
      navigate('/assessment');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
      await updateProfile(userCredential.user, {
        displayName: signupForm.name,
      });
      login(userCredential.user);
      onClose();
      navigate('/assessment');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      login(result.user);
      onClose();
      navigate('/assessment');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      login(result.user);
      onClose();
      navigate('/assessment');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glassmorphism rounded-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome to LearnNova</h2>
          <p className="text-blue-200 text-center mb-6">Join thousands of professionals transforming their skills with AI</p>
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 rounded-l-xl ${activeTab === 'login' ? 'bg-white/10 text-white font-bold' : 'bg-transparent text-blue-200'}`}
              onClick={() => setActiveTab('login')}
            >
              <span className="inline-flex items-center"><User className="w-4 h-4 mr-2" /> Login</span>
            </button>
            <button
              className={`flex-1 py-2 rounded-r-xl ${activeTab === 'signup' ? 'bg-white/10 text-white font-bold' : 'bg-transparent text-blue-200'}`}
              onClick={() => setActiveTab('signup')}
            >
              <span className="inline-flex items-center"><User className="w-4 h-4 mr-2" /> Sign Up</span>
            </button>
          </div>

          {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center bg-white/10 rounded-lg px-4">
                <Mail className="w-5 h-5 text-blue-300 mr-3" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={e => handleChange(e, 'login')}
                  className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4">
                <Lock className="w-5 h-5 text-blue-300 mr-3" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={e => handleChange(e, 'login')}
                  className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-blue-200 text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <button type="button" className="text-cyan-400 hover:underline">Forgot password?</button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg font-semibold text-lg mt-2 hover:shadow-lg transition-all"
              >
                Log In
              </button>
              <div className="my-4 text-center text-blue-200 text-xs">OR CONTINUE WITH</div>
              <div className="flex space-x-4">
                <button type="button" onClick={handleGoogleSignIn} className="flex-1 bg-slate-800 rounded-lg p-3 flex items-center justify-center text-white">
                  <span className="mr-2">G</span> Google
                </button>
                <button type="button" onClick={handleFacebookSignIn} className="flex-1 bg-slate-800 rounded-lg p-3 flex items-center justify-center text-white">
                  <span className="mr-2">f</span> Facebook
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="flex items-center bg-white/10 rounded-lg px-4">
                <User className="w-5 h-5 text-blue-300 mr-3" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={signupForm.name}
                  onChange={e => handleChange(e, 'signup')}
                  className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4">
                <Mail className="w-5 h-5 text-blue-300 mr-3" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={signupForm.email}
                  onChange={e => handleChange(e, 'signup')}
                  className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4">
                <Lock className="w-5 h-5 text-blue-300 mr-3" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={signupForm.password}
                  onChange={e => handleChange(e, 'signup')}
                  className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4">
                <Lock className="w-5 h-5 text-blue-300 mr-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={signupForm.confirmPassword}
                  onChange={e => handleChange(e, 'signup')}
                  className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center text-blue-200 text-xs">
                <input type="checkbox" className="mr-2" required />
                I agree to the <span className="text-cyan-400 mx-1 underline">Terms of Service</span> and <span className="text-cyan-400 mx-1 underline">Privacy Policy</span>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg font-semibold text-lg mt-2 hover:shadow-lg transition-all"
              >
                Create Account
              </button>
              <div className="my-4 text-center text-blue-200 text-xs">OR CONTINUE WITH</div>
              <div className="flex space-x-4">
                <button type="button" onClick={handleGoogleSignIn} className="flex-1 bg-slate-800 rounded-lg p-3 flex items-center justify-center text-white">
                  <span className="mr-2">G</span> Google
                </button>
                <button type="button" onClick={handleFacebookSignIn} className="flex-1 bg-slate-800 rounded-lg p-3 flex items-center justify-center text-white">
                  <span className="mr-2">f</span> Facebook
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;