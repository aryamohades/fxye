import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: blue;
  margin-top: 30px;
`

export default function BackToPostsLink() {
  return <StyledLink to="/">back to posts</StyledLink>
}
