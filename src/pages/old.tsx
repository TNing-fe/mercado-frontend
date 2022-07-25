import cx from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Anchor } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import Search, { useSearcher } from '@/components/Search'
import Logo from '@/assets/logo.png'
import request from '../utils/request'
import styles from './index.less'

const { Link } = Anchor

export default function IndexPage() {
  return <IndexPageBody />
}

export function IndexPageBody(props: { disableSider?: boolean }) {
  const [categoryList, setCategoryList] = useState<any[]>()
  const [data, setData] = useState<any[]>()
  const [containerElem, setContainerElem] = useState<HTMLDivElement | null>()
  const containerRef = useRef<HTMLDivElement>(null)
  const searcher = useSearcher()
  // 点击事件
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    link: {
      title: React.ReactNode;
      href: string;
    }
  ) => {
    e.preventDefault()
    console.log(link)
  }
  // 获取分类
  const fetchCategory = async () => {
    const res = await request('/api/category')
    setCategoryList(res)
    return res
  }

  // 获取对应分类下的数据
  const fetchData = async (category?: string) => {
    const data = category
      ? await request(`/api/list?category=${category}`)
      : await request('/api/list')
    setData(data)
  }

  useEffect(() => {
    fetchCategory()
    fetchData()
    setContainerElem(containerRef.current)
  }, [])

  const filteredData = searcher.filter(data)

  return (
    <div
      className={cx(styles.wrapper, props.disableSider && styles.disableSider)}
    >
      {/* 侧边栏分类 */}
      {!props.disableSider && (
        <div className={styles.leftSide}>
          {/* logo */}
          <a className={styles.logoWrapper} href="#">
            <img src={Logo} alt="logo" />
          </a>
          {/* 导航部分 */}
          <div className={styles.navigatorWrapper}>
            <div className={styles.titleWrapper}>
              <AppstoreOutlined
                style={{
                  fontSize: 22,
                  marginRight: 20,
                  verticalAlign: 'middle',
                  color: '#777'
                }}
              />
              <span
                className={styles.titleText}
                style={{ verticalAlign: 'middle' }}
              >
                导航
              </span>
            </div>
            {/* 锚点链接 */}
            {containerElem && (
              <Anchor
                affix={false}
                onClick={handleClick}
                getContainer={() => containerElem as any}
                offsetTop={150}
              >
                {categoryList?.map(item => (
                  <Link
                    key={item?.id}
                    href={`#${item?.name}`}
                    title={item?.name}
                    className={styles.linkItem}
                  />
                ))}
              </Anchor>
            )}
          </div>
        </div>
      )}
      {/* 内容 */}
      <div className={styles.rightContent} ref={containerRef}>
        <Search searcher={searcher} className={styles.search} />
        {/* 内容区 */}
        <div className={styles.content}>
          {categoryList?.map(item => (
            <div key={`category${item?.id}`} className={styles.listWrapper}>
              <h2 id={item?.name} className={styles.contentTitle}>
                {item?.name}
              </h2>
              <div className={styles.cardWrapper}>
                {/* 每个分类下的数据 */}
                {filteredData?.map(list => {
                  if (list?.category === item?.name) {
                    return (
                      <div key={`list${list?.id}`} className={styles.cardBox}>
                        <div className={styles.cardItemWrapper}>
                          <a
                            href={list?.url}
                            target="_blank"
                            className={styles.card}
                            rel="noreferrer"
                          >
                            <div className={styles.imgWrapper}>
                              <img
                                src={require(`../assets/bg/bg${list?.id}.jpg`)}
                                style={{ width: '100%' }}
                              />
                            </div>
                            <div className={styles.textBox}>
                              <p style={{ margin: 0 }}>{list?.name}</p>
                              <p title="可双击选择复制" className={styles.boxDesc} onClick={e => e.preventDefault()}>
                                {list?.desc}
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
