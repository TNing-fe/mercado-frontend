/*
 * @LastEditors: Necfol
 * @Date: 2022-05-31 19:25:36
 * @LastEditTime: 2022-07-25 23:51:04
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
