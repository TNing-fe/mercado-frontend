import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import {
  FundViewOutlined
} from '@ant-design/icons'
import style from './style.less'

const { SubMenu } = Menu
export interface MainMenuProps {
  defaultSelectedKeys: string[];
}

export const MainMenu = ({ defaultSelectedKeys = [] }: MainMenuProps) => {
  return (
    <Menu
      mode="inline"
      defaultOpenKeys={['showcase']}
      defaultSelectedKeys={defaultSelectedKeys}
      className={style.mainMenu}
    >
      <SubMenu key="showcase" icon={<FundViewOutlined />} title="组件市场">
        <Menu.Item key="showcase/eevee">
          <Link to="/showcase/eevee">装修组件</Link>
        </Menu.Item>
        <Menu.Item key="showcase/trantor">
          <Link to="/showcase/trantor">Trantor组件</Link>
        </Menu.Item>
      </SubMenu>

    </Menu>
  )
}
