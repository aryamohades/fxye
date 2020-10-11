import React from 'react'

type User = {
  name: string
  nickname: string
}

type UserContextType = {
  user: User | null
}

const UserContext = React.createContext<UserContextType>({
  user: null,
})

export default UserContext
