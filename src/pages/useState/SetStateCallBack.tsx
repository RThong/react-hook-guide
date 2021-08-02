import React, { useEffect, useState } from 'react';

const SetStateCallBack = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      SetStateCallBack
      {count}
    </div>
  );
};

export default SetStateCallBack;
