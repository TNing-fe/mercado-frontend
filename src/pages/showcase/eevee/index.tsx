/*
 * @LastEditors: Necfol
 * @Date: 2022-07-25 23:20:26
 * @LastEditTime: 2022-07-25 23:41:31
 * @FilePath: /mercado-frontend/src/pages/showcase/eevee/index.tsx
 */
import LayoutPage from '@/components/front/LayoutPage'
import { IndexPageBody } from '@/pages/old'
import style from './style.less'

const NavigationPage = () => {
  const breads = [
    { label: '首页', url: '/' },
    { label: '组件' },
    { label: '装修组件' }
  ]

  return (
    <LayoutPage bodyClassName={style.page} title="装修组件" breads={breads}>
      <IndexPageBody disableSider />
    </LayoutPage>
  )
}

export default NavigationPage
