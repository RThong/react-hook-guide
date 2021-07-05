import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/deps/1', component: '@/pages/deps/demo1' },
  ],
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
  dynamicImport: {},
});
