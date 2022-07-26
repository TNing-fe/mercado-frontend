/*
 * @LastEditors: Necfol
 * @Date: 2022-05-31 19:25:36
 * @LastEditTime: 2022-07-26 23:19:44
 * @FilePath: /mercado-frontend/src/layouts/front/index.tsx
 */
import type { ReactNode } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { ConfigProvider, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, CloudUploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import zhCN from 'antd/lib/locale/zh_CN'
// import { withLoginContainer } from '@/components/LoginContainer'
import logoUrl from '@/assets/logo.png'
import style from './style.less'
import { MainMenu } from './MainMenu'

moment.locale('zh-cn')

interface FrontLayoutProps {
  location: {
    pathname: string;
  };
  children: ReactNode;
}

interface MenuItemProps {
  key: string;
  name: string;
  action: string;
  icon: any;
}
const menuItemArr: Array<MenuItemProps> = [{
  key: '0',
  name: '发布组件',
  action: '/upload',
  icon: <CloudUploadOutlined />
}]
const menu = (
  <Menu
    items={menuItemArr.map(({ key, name, action, icon }) => ({
      key,
      label: (
        <Link to={action} className={style.login}>
          {name}
        </Link>
      ),
      icon
    }))}
  />
)
const FrontLayout = ({ location, children }: FrontLayoutProps) => {
  const token = sessionStorage.getItem('token')
  return (
    <ConfigProvider locale={zhCN}>
      <div className={style.layout}>
        <div className={style.header}>
          <h1 className={style.logo}>
            <img src={logoUrl} alt="组件市场" />
            <span className="text">组件市场</span>
          </h1>
          {/* todo 为了调试这边取反了 */}
          {token ? (
            <Link to="/admin/login" className={style.login}>
              登录
            </Link>
          ) : (
            <Dropdown className={style.login} overlay={menu}>
              <Space>
                昵称
                <DownOutlined />
              </Space>
            </Dropdown>
          )}
        </div>
        <div className={style.body}>
          <div className={style.sidebar}>
            <MainMenu defaultSelectedKeys={[location.pathname]} />
          </div>
          <div className={style.main}>{children}</div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default FrontLayout
// export default withLoginContainer()(FrontLayout)
