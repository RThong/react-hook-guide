/**
 * 使用useRef来保存一些特定的值，已达到减少依赖的目的
 * 一般情况下作为props传入的方法，例如点击回调、接口回调，他们的行为目的大多不会变化，
 * 但是使用箭头函数传入有时会造成一些问题，可以通过useRef来处理类似的情况
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';

// 每秒重新渲染
const useInfinityRender = () => {
  const [a, setA] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('父组件重新render');

      setA({});
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
};

/** ***  基础场景  *************************** */

const Child = ({ getData }: any) => {
  // 这里不写依赖也能完成需求，但是lint会提示warning
  useEffect(() => {
    getData();
  }, [getData]);
  return <div>Child</div>;
};

const Parent = () => {
  useInfinityRender();

  const fn = () => {
    console.log('调用接口');

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(123);
      }, 1000);
    });
  };

  return (
    <div>
      Parent
      <Child getData={fn} />
    </div>
  );
};

export default Parent;
/** ***  结束  *************************** */

/** *  方法一：父组件使用useCallback包裹接口方法再传入子组件
 *           但是子组件不应该去要求外部对props进行处理再传入
 */
// const Child = ({ getData }: any) => {
//   useEffect(() => {
//     getData();
//   }, [getData]);
//   return <div>Child</div>;
// };

// const Parent = () => {
//   useInfinityRender();

//   const fn = useCallback(() => {
//     console.log('调用接口');

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(123);
//       }, 1000);
//     });
//   }, []);

//   return (
//     <div>
//       Parent
//       <Child getData={fn} />
//     </div>
//   );
// };

// export default Parent;

/** ****************     方法一结束   ******************* */

/** *  方法二：假设外部传入的接口方法一般不会变动，所以可以用useRef保存
 */
// const Child = ({ getData }: any) => {
//   const fetch = useRef(getData);

//   useEffect(() => {
//     fetch.current();
//   }, []);

//   return <div>Child</div>;
// };

// const Parent = () => {
//   useInfinityRender();

//   const fn = () => {
//     console.log('调用接口');

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(123);
//       }, 1000);
//     });
//   };

//   return (
//     <div>
//       Parent
//       <Child getData={fn} />
//     </div>
//   );
// };

// export default Parent;
/** ****************     方法二结束   ******************* */

/** *  方法三：通过React.memo的第二个参数来判断在哪些props变化时才重新渲染子组件，进而达到不会无限重新请求的目的
 */
// const Child = React.memo(
//   ({ getData }: any) => {
//     useEffect(() => {
//       getData();
//     }, [getData]);
//     return <div>Child</div>;
//   },
//   (prev, next) => {
//     return true;
//   },
// );

// const Parent = () => {
//   useInfinityRender();

//   const fn = () => {
//     console.log('调用接口');

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(123);
//       }, 1000);
//     });
//   };

//   return (
//     <div>
//       Parent
//       <Child getData={fn} />
//     </div>
//   );
// };

// export default Parent;
