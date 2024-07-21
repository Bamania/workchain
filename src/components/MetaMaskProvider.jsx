import React, { createContext, useContext, useState } from 'react';

const MetaMaskContext = createContext();

export const useMetaMask = () => useContext(MetaMaskContext);

const MetaMaskProvider = ({ children }) => {
  const [account, setAccount] = useState('');

  return (
    <MetaMaskContext.Provider value={{ account, setAccount }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default MetaMaskProvider;