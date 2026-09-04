import  React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const adminLogin = (credentials) => {
    if (credentials.email === 'admin@skillpath.ai' && credentials.password === 'admin123') {
      setAdminUser({ name: 'Admin', email: 'admin@skillpath.ai', role: 'admin' });
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{
      isAdminAuthenticated,
      adminUser,
      adminLogin,
      adminLogout
    }}>
      {children}
    </AdminContext.Provider>
  );
};
 