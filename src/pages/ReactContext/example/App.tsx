import React from 'react'
import UserContext from './UserContext'
import NameTag from './NameTag'

const userCtx = {
  user: {
    name: 'Foo',
    nickname: 'Bar',
  },
}

export default function App() {
  return (
    <UserContext.Provider value={userCtx}>
      <NameTag showNickname />
    </UserContext.Provider>
  )
}
