import { Button, Input, InputProps } from 'antd';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

/**
 * 场景：封装的组件想要让外部能够调用内部dom元素的api，例如：focus、获取元素宽高等
 */
const Child = forwardRef<Input>((props, ref) => {
  return <Input ref={ref}></Input>;
});

const Child2 = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref}></input>;
});

// forwardref vs 自定义ref props： https://stackoverflow.com/questions/58578570/value-of-using-react-forwardref-vs-custom-ref-prop

// const Child3 = (props) => {
//   useEffect(() => {
//     console.log('【props】', props);
//   }, [props]);
//   return <input ref={props.aaa}></input>;
// };

const Parent = () => {
  const antdInputRef = useRef<Input>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // const ref = useRef(null);

  useEffect(() => {
    antdInputRef.current?.focus();
    // console.log('【ref】', ref);

    // inputRef.current?.focus();
  }, []);

  return (
    <div>
      <Child ref={antdInputRef} />
      <Child2 ref={inputRef} />
      {/* <Child3 aaa={ref} /> */}
      <Button
        onClick={() => {
          console.log(`antd input${antdInputRef.current?.input.value}`);
          console.log('input', inputRef.current?.value);
          // console.log('asd', ref.current?.value);
        }}
      >
        click
      </Button>
    </div>
  );
};

export default Parent;
