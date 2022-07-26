/*
 * @LastEditors: Necfol
 * @Date: 2022-05-31 19:25:36
 * @LastEditTime: 2022-07-26 22:35:40
 * @FilePath: /mercado-frontend/src/routes.ts
 */
export default [
  { path: '/admin/login', component: '@/pages/admin/login' },
  {
    path: '/admin',
    component: '@/layouts/admin',
    routes: [
    ]
  },
  { path: '/upload', component: '@/pages/upload' },
  {
    path: '/',
    component: '@/layouts/front',
    routes: [
      { path: '/', exact: true, component: '@/pages/index' },
      {
        path: '/showcase/eevee',
        type: 'showcase',
        component: '@/pages/showcase/eevee'
      },
      {
        path: '/showcase/trantor',
        component: '@/pages/showcase/eevee'
      }
    ]
  }
]
