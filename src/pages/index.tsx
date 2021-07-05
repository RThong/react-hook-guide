import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [a, setA] = useState(1);
  useEffect(() => {
    console.log(a);
  }, [a]);

  return (
    <div>
      <h1>Page index</h1>
    </div>
  );
}
