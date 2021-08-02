/**
 * 使用useRef来保存一些特定的值，以达到减少依赖的目的
 * 一般情况下作为props传入的回调方法，他们的行为目的大多不会变化，
 * 但是使用箭头函数传入有时会造成一些问题，可以通过useRef来处理类似的情况
 */

/**
 * 场景：一般是在子组件的生命周期中需要去执行父组件传入的回调（并不是常规的子组件点击提交表单执行父组件回调等场景），
 *      简单来说就是子组件hook需要依赖父组件的回调的场景。很少遇到
 * 前提：严格遵循hook的eslint规则
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

// const Child = ({ cb }: any) => {
//   // 这里不写依赖也能完成需求，但是lint会提示warning
//   useEffect(() => {
//     cb();
//   }, [cb]);

//   return <div>Child</div>;
// };

// const Parent = () => {
//   useInfinityRender();

//   const fn = () => {
//     console.log('回调');
//   };

//   return (
//     <div>
//       Parent
//       <Child cb={fn} />
//     </div>
//   );
// };

// export default Parent;
/** ***  结束  *************************** */

/** *  方法一：父组件使用useCallback包裹回调方法再传入子组件
 *           但是子组件（例如第三方组件）不应该去要求外部对props进行处理再传入
 */
// const Child = ({ cb }: any) => {
//   useEffect(() => {
//     cb();
//   }, [cb]);
//   return <div>Child</div>;
// };

// const Parent = () => {
//   useInfinityRender();

//   const fn = useCallback(() => {
//     console.log('回调');
//   }, []);

//   return (
//     <div>
//       Parent
//       <Child cb={fn} />
//     </div>
//   );
// };

// export default Parent;

/** ****************     方法一结束   ******************* */

/** *  方法二：外部传入的回调方法的行为一般不会变动，所以可以用useRef保存
 */
// const Child = ({ cb }: any) => {
//   const callback = useRef(cb);

//   useEffect(() => {
//     callback.current();
//   }, []);

//   return <div>Child</div>;
// };

// const Parent = () => {
//   useInfinityRender();

//   const fn = () => {
//     console.log('回调');
//   };

//   return (
//     <div>
//       Parent
//       <Child cb={fn} />
//     </div>
//   );
// };

// export default Parent;
/** ****************     方法二结束   ******************* */

/** *  方法三：使用React.memo的第二个参数来判断在哪些props变化时才重新渲染子组件，所以即使cb一直改变也不会导致副作用一直执行
 */
// const Child = React.memo(
//   ({ cb }: any) => {
//     useEffect(() => {
//       cb();
//     }, [cb]);
//     return <div>Child</div>;
//   },
//   (prev, next) => {
//     return true;
//   },
// );

// const Parent = () => {
//   useInfinityRender();

//   const fn = () => {
//     console.log('回调');
//   };

//   return (
//     <div>
//       Parent
//       <Child cb={fn} />
//     </div>
//   );
// };

// export default Parent;
