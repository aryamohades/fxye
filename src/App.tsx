import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { NotFound, Posts, ProjectStructure, ReactContext } from './pages'
import { PageContent, PageWarning } from './components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
`

const Logo = styled(Link)`
  color: #333333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  padding: 5px;
`

export default function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header>
          <Logo to="/">fxye</Logo>
        </Header>
        <PageContent>
          <PageWarning>site under development</PageWarning>
          <Switch>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route exact path="/react-project-structure">
              <ProjectStructure />
            </Route>
            <Route exact path="/react-context">
              <ReactContext />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </PageContent>
      </Wrapper>
    </BrowserRouter>
  )
}
