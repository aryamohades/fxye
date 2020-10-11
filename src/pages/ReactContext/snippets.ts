export const USER_CONTEXT = `\
// UserContext.ts

import React from 'react'

type User = {
  name: string;
  nickname: string;
}

type UserContextType = {
  user: User | null;
}

const UserContext = React.createContext<UserContextType>({
  user: null
})

export default UserContext
`

export const CONTEXT_PROVIDER = `\
// App.tsx

import React from 'react'
import UserContext from './UserContext'
import NameTag from './NameTag'

const userCtx = {
  user: {
    name: 'Foo',
    nickname: 'Bar'
  }
}

export default function App() {
  return (
    <UserContext.Provider value={userCtx}>
      <NameTag showNickname />
    </UserContext.Provider>
  )
}
`

export const CONTEXT_CONSUMER = `\
// NameTag.tsx

import React from 'react'
import UserContext from './UserContext'

interface Props {
  showNickname?: boolean;
}

export default function NameTag(props: Props) {
  const { showNickname } = props

  const user = React.useContext(UserContext)

  if (!user) {
    return null
  }

  return (
    <div>
      <div>{user.name}</div>
      {showNickname && (
        <div>{user.nickname}</div>
      )}
    </div>
  )
}
`

export const NAME_TAG_V2 = `\
// updated NameTag.tsx

import React from 'react'
import UserContext from './UserContext'
import mapContextToProps from './mapContextToProps'

interface User {
  name: string;
  nickname: string;
}

interface Context {
  user: User | null;
}

interface Props {
  showNickname?: boolean;
}

export function NameTag(props: Context & Props) {
  const { user, showNickname } = props

  if (!user) {
    return null
  }

  return (
    <div>
      <div>{user.name}</div>
      {showNickname && (
        <div>{user.nickname}</div>
      )}
    </div>
  )
}

export default mapContextToProps<Context, Props>(
  UserContext,
  NameTag
)
`

export const MAP_CONTEXT_TO_PROPS = `\
// mapContextToProps.tsx

import React from 'react'

export default function mapContextToProps<ContextType, PropsType>(
  Context: React.Context<ContextType>,
  Component: React.FC<ContextType & PropsType>
): React.FC<PropsType> {
  return function WrappedComponent(props: PropsType) {
    const ctx = React.useContext(Context)
    const ctxAndProps = { ...ctx, ...props }
    return <Component {...ctxAndProps} />
  }
}
`
