import type { ReactNode } from 'react'
import { GlobalNavigation, Icon, SideNavigation } from '@terminus/nusi'
import { history } from 'umi'
import style from './style.less'

interface AdminLayoutProps {
  location: {
    pathname: string;
  };
  children: ReactNode;
}

const AdminLayout = ({ location, children }: AdminLayoutProps) => {
  const { pathname } = location

  const userMenu = {
    name: 'mercado',
    operations: [
      {
        icon: <Icon type="exit" />,
        title: '退出登录',
        onClick: () => {
          sessionStorage.removeItem('token')
          history.push('/admin/login')
        }
      }
    ]
  }
  const dataSource = [
    {
      icon: 'visiting-card',
      key: '/admin/components',
      title: '组件管理'
    }
  ]

  const header = {
    header: '',
    headerIsFold: (
      <div
        style={{
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon type="home" />
      </div>
    )
  }

  return (
    <div className={style.layout}>
      <GlobalNavigation
        appName="组件市场"
        layout="horizontal"
        userMenu={userMenu}
      />
      <div className={style.body}>
        <SideNavigation
          onClick={(url: string) => {
            console.log(url)
            history.push(url)
          }}
          theme={'light' as any}
          matchUrl
          header={header}
          dataSource={dataSource}
          defaultSelectedKey={pathname}
        />
        <div className={style.main}>{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
