import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/deps/1', component: '@/pages/deps/demo1' },
    { path: '/deps/2', component: '@/pages/deps/demo2' },
    { path: '/useState', component: '@/pages/useState/SetStateCallBack' },
    { path: '/useRef/ThirdLib', component: '@/pages/useRef/ThirdLib' },
  ],
  fastRefresh: {},
  dynamicImport: {},
});
