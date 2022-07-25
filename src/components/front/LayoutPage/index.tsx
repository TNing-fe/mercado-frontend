import type { ReactNode } from 'react'
import cx from 'classnames'
import type { BreadItem } from '../Breadcrumb'
import Breadcrumb from '../Breadcrumb'
import style from './style.less'

export type FrontLayoutProps = {
  bodyClassName?: string
  breads?: BreadItem[]
  title?: string
  extra?: ReactNode
  children: ReactNode
}

const LayoutPage = ({
  bodyClassName,
  breads,
  title,
  extra,
  children
}: FrontLayoutProps) => {
  const showHeader = !!title
  return (
    <div className={style.page}>
      {breads && <Breadcrumb items={breads} />}
      {showHeader && (
        <div className={style.header}>
          <h2 className={style.title}>{title}</h2>
          {extra && (
            <div className={style.extra}>
              {extra}
            </div>
          )}
        </div>
      )}
      <div className={cx(style.body, bodyClassName)}>{children}</div>
    </div>
  )
}

export default LayoutPage
