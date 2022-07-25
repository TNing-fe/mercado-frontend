export type Paging<T = Record<string, any>> = {
  page: number
  pageSize: number
  records: T[]
  total: number
}
