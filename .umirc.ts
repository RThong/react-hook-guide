import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/deps/1', component: '@/pages/deps/demo1' },
        { path: '/deps/2', component: '@/pages/deps/demo2' },
        { path: '/deps/3', component: '@/pages/deps/demo3', text: '多个相互关联的依赖' },
        { path: '/useState', component: '@/pages/useState/SetStateCallBack' },
        {
          path: '/useRef/ThirdLib',
          component: '@/pages/useRef/ThirdLib',
          text: '图表库结合useRef',
        },
        { path: '/useRef/1', component: '@/pages/useRef/demo', text: '保存不参与渲染的值' },
        { path: '/forwardRef', component: '@/pages/forwardRef', text: '暴露子组件内部的Dom元素' },
        {
          path: '/useImperativeHandle',
          component: '@/pages/useImperativeHandle',
          text: '自定义暴露子组件内部的任何状态',
        },
      ],
    },
  ],
  fastRefresh: {},
  dynamicImport: {},
});
