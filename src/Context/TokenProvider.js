import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [token, setToken] = useState(cookies.token || null);

  useEffect(() => {
    if (token) {
      setCookie('token', token, { path: '/', maxAge: 3600 });
    }
  }, [token, setCookie]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
