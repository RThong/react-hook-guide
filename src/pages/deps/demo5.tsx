import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

/**
 * 函数内可能存在状态相关逻辑，所以在缺少正确依赖的情况下只会打印出1
 * @returns
 */
/** *************** 缺少函数依赖  ************************* */
const Demo = () => {
  const [a, setA] = useState(1);

  const getData = () => {
    console.log(a);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Button onClick={() => setA((val) => val + 1)}>a+1</Button>
    </div>
  );
};

export default Demo;
/** *****************     *********************************** */

/** **************  改进： 如果只在useEffect内使用这个方法
 *                        直接将方法定义在useEffect内，再添加正确依赖
 */
// const Demo = () => {
//   const [a, setA] = useState(1);

//   useEffect(() => {
//     const getData = () => {
//       console.log(a);
//     };

//     getData();
//   }, [a]);

//   return (
//     <div>
//       <Button onClick={() => setA((val) => val + 1)}>a+1</Button>
//     </div>
//   );
// };

// export default Demo;
/** *******************      ******************************* */

/** ************ 改进： 如果多个地方使用这个方法
 *                     就使用useCallback包裹方法，并在依赖数组中添加这个函数依赖
 */
// const Demo = () => {
//   const [a, setA] = useState(1);

//   const getData = useCallback(() => {
//     console.log(a);
//   }, [a]);

//   useEffect(() => {
//     getData();
//   }, [getData]);

//   return (
//     <div>
//       <Button onClick={() => setA((val) => val + 1)}>a+1</Button>
//       <Button onClick={getData}>打印</Button>
//     </div>
//   );
// };

// export default Demo;
/** *******************      ******************************* */
