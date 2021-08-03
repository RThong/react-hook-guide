import { useState, useEffect } from 'react';

// 每秒重新渲染
const useInfinityRender = () => {
  const [a, setA] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setA({});
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
};

export default useInfinityRender;
