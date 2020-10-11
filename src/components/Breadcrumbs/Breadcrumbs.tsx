import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CrumbList = styled.div`
  display: flex;
  align-items: center;
  color: #bbbbbb;
  margin-bottom: 12px;
`

const CrumbListItem = styled.div<{ current?: boolean }>`
  font-size: 14px;
  font-weight: ${({ current }) => (current ? 700 : 400)};
  color: ${({ current }) => (current ? '#111111' : '#555555')};

  > a {
    color: inherit;

    &:hover {
      color: blue;
    }
  }
`

const CrumbSeparator = styled.div`
  margin: 0 6px;
  font-size: 12px;
  color: black;
`

type Crumb = {
  label: string
  link?: string
}

interface Props {
  crumbs: Crumb[]
}

export default function Breadcrumbs({ crumbs }: Props) {
  const items: React.ReactNode[] = []

  crumbs.forEach((crumb, index) => {
    let item: React.ReactNode = null

    if (index === crumbs.length - 1) {
      item = (
        <CrumbListItem key={crumb.label} current>
          {crumb.label}
        </CrumbListItem>
      )
    } else if (crumb.link) {
      item = (
        <CrumbListItem key={crumb.label}>
          <Link to={crumb.link}>{crumb.label}</Link>
        </CrumbListItem>
      )
    } else {
      item = <CrumbListItem key={crumb.label}>{crumb.label}</CrumbListItem>
    }

    items.push(item)

    if (index % 2 === 0) {
      items.push(
        <CrumbSeparator key={`sep-${crumb.label}`}>{'>'}</CrumbSeparator>,
      )
    }
  })

  return <CrumbList>{items}</CrumbList>
}
