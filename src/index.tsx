import React from 'react'
import ReactDOM from 'react-dom'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { createGlobalStyle } from 'styled-components'
import App from './App'

SyntaxHighlighter.registerLanguage('javascript', js)

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
  }

  * {
    box-sizing: border-box;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    line-height: 1.5;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 13px;
  }

  pre {
    padding: 15px !important;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
