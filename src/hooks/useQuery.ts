import { useState, useRef } from 'react'

export type Querier<Data, Params extends any[]> = (
  ...args: Params
) => Promise<Data>

export default function useQuery<Data, Params extends any[]>(
  querier: Querier<Data, Params>,
  defaultData?: Data
): {
    loading: boolean;
    data: Data | undefined;
    query: Querier<Data, Params>;
    reload: () => Promise<Data>;
  } {
  const lastArgsRef = useRef<Params>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(defaultData)
  const query = async (...args: Params) => {
    lastArgsRef.current = args
    setLoading(true)
    try {
      const next = await querier(...args)
      setData(next)
      return next
    } finally {
      setLoading(false)
    }
  }
  const reload = () => query(...lastArgsRef.current!)
  return { loading, data, query, reload }
}
