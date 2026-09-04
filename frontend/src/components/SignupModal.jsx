import React, { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignupModal = ({ onClose, onSignIn }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      onClose(); // Close modal
      navigate('/assessment'); // ✅ Redirect after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glassmorphism rounded-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Get Started</h2>
          {error && <p className="text-red-400 text-center">{error}</p>}
          <div className="space-y-4">
            <div className="flex items-center bg-white/10 rounded-lg px-4">
              <User className="w-5 h-5 text-blue-300 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center bg-white/10 rounded-lg px-4">
              <Mail className="w-5 h-5 text-blue-300 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center bg-white/10 rounded-lg px-4">
              <Lock className="w-5 h-5 text-blue-300 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent p-3 text-white placeholder-blue-200 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg font-semibold text-lg mt-2 hover:shadow-lg transition-all"
          >
            Create Account
          </button>
          <div className="text-center mt-4 text-blue-200">
            Already have an account?{' '}
            <button
              type="button"
              className="text-cyan-400 font-semibold hover:underline"
              onClick={onSignIn}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
