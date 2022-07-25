import { useState } from 'react'
import { Input } from 'antd'
import cx from 'classnames'
import style from './style.less'

export function useSearcher() {
  const [search, setSearch] = useState('')
  const filter = (list: any) => {
    return filterList(list, search)
  }
  return {
    search,
    setSearch,
    filter
  }
}

export type SearchBarProps = {
  searcher: any;
  className?: string;
  place?: boolean;
}

export default function SearchBar({
  className,
  searcher,
  place
}: SearchBarProps) {
  return (
    <div className={cx(style.search, className, place && style.place)}>
      <div className={style.searchBox}>
        <Input.Search
          value={searcher.search}
          onChange={e => searcher.setSearch(e.target.value)}
        />
      </div>
    </div>
  )
}

function filterList(list: any, search: string) {
  search = search.trim()
  if (!list || !search) {
    return list
  }
  return list.filter((item: any) => {
    return Object.keys(item).some(key => {
      const value = item[key]
      return typeof value === 'string' && value.includes(search)
    })
  })
}
