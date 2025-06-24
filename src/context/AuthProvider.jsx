// import React, { createContext, useState, useEffect } from 'react';
// import { getLocalStorage, setLocalStorage } from '../utils/localStorage'; // Adjust path if needed

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     setLocalStorage()
//     const storage = getLocalStorage();
//     if (storage) {
//       const { employees, admin } = storage;
//       setUserData({ employees, admin });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={[userData,setUserData]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/localStorage'; // Adjust path if needed

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Load from localStorage on first mount
  useEffect(() => {
    const storage = getLocalStorage();
    if (storage) {
      const { employees, admin } = storage;
      setUserData({ employees, admin });
    }
  }, []);

  // Save to localStorage whenever userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('employees', JSON.stringify(userData.employees));
      localStorage.setItem('admin', JSON.stringify(userData.admin));
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

