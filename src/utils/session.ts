import request from './request'

export type User = {
  id: number;
  nickname: string;
}

export async function loadCurrentUser(): Promise<User | null> {
  const user: User = await request('/api/users/current').catch(e => {
    global.console.error(e)
    return null
  })
  return user
}
