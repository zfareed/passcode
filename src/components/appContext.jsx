import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <AppContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </AppContext.Provider>
  );
};
