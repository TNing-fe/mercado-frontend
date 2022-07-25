import { Toast } from '@terminus/nusi'
import request from 'umi-request'

const BASE_URL = ''

// const org = window.location.hostname.split('.')[0]

export default async (url: string, method = 'get', payload: Record<string, any> = {}) => {
  const token = sessionStorage.getItem('token')
  const data = {
    org: 'ba',
    _t: Date.now(),
    ...payload
  }

  try {
    const res = await request(BASE_URL + url, {
      method,
      params: method === 'get' ? data : {},
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.code || res.code !== 200) {
      Toast.error(`请求失败-${res.msg}`)
      return undefined
    }

    return res?.data
  } catch (err) {
    window.console.log(err)
    return undefined
  }
}
