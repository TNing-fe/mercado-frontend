/*
 * @LastEditors: Necfol
 * @Date: 2022-05-31 19:25:36
 * @LastEditTime: 2022-07-26 23:19:18
 * @FilePath: /mercado-frontend/src/app.tsx
 */
// 运行时配置
import { history } from 'umi'
import { notification } from '@terminus/nusi'

// todo 权限控制等接入uc和acl之后加上
const whiteList = [
  '/admin/login',
  '/',
  '/upload',
  '/showcase',
  '/showcase/eevee',
  '/showcase/trantor'
]

export function onRouteChange({ location }: any) {
  const { pathname } = location

  if (!whiteList.includes(pathname)) {
    const token = sessionStorage.getItem('token')
    if (!token) {
      history.push('/admin/login')
      notification.open({
        message: '请前往登录系统',
        description: '登录状态已失效，请重新登录'
      })
    }
  }
}
