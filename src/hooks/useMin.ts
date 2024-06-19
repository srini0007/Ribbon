import { useContext } from 'react';
import { MinContext } from '../context/MinContext';

const useMin = () => {
  const context = useContext(MinContext);
  if (context === undefined) {
    throw new Error('useMin must be used within a MinProvider');
  }
  return context;
};

export default useMin;
