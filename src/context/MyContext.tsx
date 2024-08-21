import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface MyContextState {
  isFirst: boolean;
  setIsFirst: (isFirst: boolean) => void;
}

// Create the context with a default value
const MyContext = createContext<MyContextState | undefined>(undefined);

// Create a provider component
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);

  return (
    <MyContext.Provider value={{ isFirst, setIsFirst }}>
      {children}
    </MyContext.Provider>
  );
};

// Export the context to be used in other components
export default MyContext;