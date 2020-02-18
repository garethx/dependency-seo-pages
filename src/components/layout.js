import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import normalize from 'normalize.css'
import Header from './header'

const Style = createGlobalStyle`
  ${normalize}
  body {
    font-family: "Inter";

    ul {
      padding: 0;
      list-style: none;
    }

    * {
      box-sizing: border-box;
    }
  }
`

const Main = styled.main`
  margin: 0 auto;
  width: 1313px;
  max-width: 80%;
`

const Layout = ({ children }) => {
  return (
    <>
      <Style />
      <Header siteTitle="Dependency Page" />
      <Main>{children}</Main>
    </>
  )
}

export default Layout
