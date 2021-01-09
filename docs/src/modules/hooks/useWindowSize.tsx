import { useState, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useWindowSize = (): Size => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return size;
};
