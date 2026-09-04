import  React, { useState } from 'react';
import { X, Shield, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const AdminAuthModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { adminLogin } = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const success = adminLogin(formData);
    if (success) {
      onClose();
    } else {
      setError('Invalid admin credentials');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="glassmorphism rounded-2xl w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <p className="text-blue-200">Secure access to admin dashboard</p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 mb-4 p-3 bg-red-500/10 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Admin Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg hover:shadow-lg transition-all"
            >
              Login as Admin
            </button>
          </form>
          
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
            <p className="text-xs text-blue-200">
              Demo credentials: admin@skillpath.ai / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthModal;
 