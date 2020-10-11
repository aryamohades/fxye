import React from 'react'
import UserContext from './UserContext'
import mapContextToProps from './mapContextToProps'

interface User {
  name: string
  nickname: string
}

interface Context {
  user: User | null
}

interface Props {
  showNickname?: boolean
}

export function NameTag(props: Context & Props) {
  const { user, showNickname } = props

  if (!user) {
    return null
  }

  return (
    <div>
      <div>{user.name}</div>
      {showNickname && <div>{user.nickname}</div>}
    </div>
  )
}

export default mapContextToProps<Context, Props>(UserContext, NameTag)
