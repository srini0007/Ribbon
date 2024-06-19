import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface MinContextProps {
  ismin: boolean;
  setIsMin: Dispatch<SetStateAction<boolean>>;
}

const MinContext = createContext<MinContextProps | undefined>(undefined);

const MinProvider = ({ children }: { children: ReactNode }) => {
  const [ismin, setIsMin] = useState<boolean>(false);

  return (
    <MinContext.Provider value={{ ismin, setIsMin }}>
      {children}
    </MinContext.Provider>
  );
};

export { MinProvider, MinContext };
