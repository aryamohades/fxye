import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageHeader, PageSubheader } from '../../components'

const PostList = styled.ul`
  padding: 20px 0;
`

const PostListItem = styled.li`
  margin: 12px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  > a {
    font-size: 18px;
    font-weight: 600;
    color: blue;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default function Posts() {
  return (
    <>
      <PageHeader>fxye</PageHeader>
      <PageSubheader>making js less bad</PageSubheader>
      <PostList>
        <PostListItem>
          <Link to="/react-project-structure">React project structure</Link>
        </PostListItem>
        <PostListItem>
          <Link to="/react-context">React context</Link>
        </PostListItem>
      </PostList>
    </>
  )
}
