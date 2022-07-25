/*
 * @LastEditors: Necfol
 * @Date: 2022-07-25 22:08:34
 * @LastEditTime: 2022-07-25 23:46:38
 * @FilePath: /mercado-frontend/src/components/LoginContainer.tsx
 */
import type { ComponentType, ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { loadCurrentUser } from '@/utils/session'

export type LoginContainerProps = {
  children: ReactElement;
}

export const LoginContainer = ({ children }: LoginContainerProps) => {
  const [logined, setLogined] = useState(false)
  useEffect(() => {
    const load = async () => {
      const user = await loadCurrentUser()
      if (!user && !isDev()) {
        redirectToLogin()
        return
      }
      console.log(user)
      setLogined(true)
    }
    load().catch(e => {
      console.error(e)
    })
  }, [])
  return logined ? children : null
}

type WrappedView = <P>(View: ComponentType<P>) => (props: P) => ReactElement
export const withLoginContainer = (): WrappedView => View => {
  return props => {
    return (
      <LoginContainer>
        <View {...props} />
      </LoginContainer>
    )
  }
}

function redirectToLogin() {
  const redirectUrl = encodeURIComponent(window.location.origin)
  window.location.href = `https://uc.app.terminus.io/login?redirectUrl=${redirectUrl}`
}

function isDev() {
  return /^dev\b/.test(window.location.hostname)
}
