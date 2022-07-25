import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

export type BreadItem = {
  label: string;
  url?: string;
}

export interface BreadCrumbProps {
  items: BreadItem[];
}

const MyBreadcrumb = ({ items }: BreadCrumbProps) => {
  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.url ? <Link to={item.url}>{item.label}</Link> : item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default MyBreadcrumb
