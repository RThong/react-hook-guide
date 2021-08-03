import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import useInfinityRender from '../customHook/useInfinityRender';

/**
 * 场景：例如一个依赖很多状态的接口，想要在组件第一次渲染的时候去请求
 * @returns
 */
const Demo = () => {
  useInfinityRender();

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log('是否第一次渲染', isFirstRender.current);
  });

  // useEffect(() => {
  //   if(isFirstRender.current){
  //     getData(a,b,c,d)
  //     isFirstRender.current = false;
  //   }
  // },[a,b,c,d])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  });

  return <div>Demo</div>;
};

export default Demo;
