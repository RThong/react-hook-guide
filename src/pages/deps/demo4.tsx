import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

const Demo = () => {
  const [a, setA] = useState(1);

  const [b, setB] = useState(1);

  // effect回调中拿不到b的最新值
  useEffect(() => {
    console.log(a, b);
  }, [a]);

  return (
    <div>
      <Button
        onClick={() => {
          setA((val) => val + 1);
        }}
      >
        修改A
      </Button>
      <Button
        onClick={() => {
          setB((val) => val + 1);
        }}
      >
        修改B
      </Button>
    </div>
  );
};

export default Demo;
