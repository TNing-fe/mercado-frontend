/*
 * @LastEditors: Necfol
 * @Date: 2022-05-31 19:25:36
 * @LastEditTime: 2022-07-25 23:54:43
 * @FilePath: /mercado-frontend/.umirc.ts
 */
import { defineConfig } from 'umi';
import routes from './src/routes';

export default defineConfig({
  devtool: false,
  antd: false,
  ignoreMomentLocale: true,
  title: '组件市场',
  favicon: 'https://duandian.com/favicon.ico',
  nodeModulesTransform: {
    type: 'none',
  },
  // 路由
  routes,
  chainWebpack: function (config) {
    // dayjs替换moment，减小包体积
    config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin', [
      {
        preset: 'antdv3',
      },
    ]);
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
});
