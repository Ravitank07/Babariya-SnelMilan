import React, { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['role']);
  const [role, setRole] = useState(cookies.role || "");

  useEffect(() => {
    if (role) {
      setCookie('role', role, { path: '/', maxAge: 3600 });
    }
  }, [role, setCookie]);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => useContext(UserRoleContext);
