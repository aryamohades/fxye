import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageHeader } from '../../components'

const BackToHomeLink = styled(Link)`
  color: blue;
  display: inline-block;
  margin-top: 8px;
`

export default function NotFound() {
  return (
    <>
      <PageHeader>nothing to see here</PageHeader>
      <BackToHomeLink to="/">take me home</BackToHomeLink>
    </>
  )
}
