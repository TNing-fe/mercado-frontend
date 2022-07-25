import request from '@/utils/request'

export type Response<T> =
  | { success: true; data?: T }
  | { success: false; message: string }

export default function createServiceActions<T>({
  baseUrl,
  payloadField
}: {
  baseUrl: string;
  payloadField: string;
}) {
  const get = async (id: number): Promise<T> => {
    return request(`${baseUrl}/${id}`)
  }

  const create = async (data: T): Promise<Response<number>> => {
    const id = await request(baseUrl, 'post', { [payloadField]: data })
    return { success: true, data: id }
  }

  const update = async (id: number, data: T): Promise<Response<void>> => {
    await request(`${baseUrl}/${id}`, 'put', { [payloadField]: data })
    return { success: true }
  }

  const del = async (id: number): Promise<Response<void>> => {
    await request(`${baseUrl}/${id}`, 'delete')
    return { success: true }
  }

  return { get, create, update, del }
}
