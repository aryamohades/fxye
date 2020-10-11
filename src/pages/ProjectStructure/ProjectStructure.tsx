import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {
  BackToPostsLink,
  Breadcrumbs,
  ParagraphHeader,
  PostTitle,
} from '../../components'
import * as snippets from './snippets'

const crumbs = [
  {
    label: 'posts',
    link: '/',
  },
  {
    label: 'react project structure',
  },
]

export default function ProjectStructure() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <PostTitle>about React project structure</PostTitle>
      <ParagraphHeader>Coming soon...</ParagraphHeader>
      <SyntaxHighlighter language="javascript" style={tomorrowNightBlue}>
        {snippets.STRUCTURE_OVERVIEW}
      </SyntaxHighlighter>
      <BackToPostsLink />
    </>
  )
}
