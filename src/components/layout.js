import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import normalize from 'normalize.css'

import Footer from './footer'
import { ThemeProvider } from '@codesandbox/components'
import designLanguage from '@codesandbox/components/lib/design-language/index'

import Header from './header'

const Style = createGlobalStyle`
  ${normalize}
  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    background: ${designLanguage.colors.grays[900]} !important;
    color: ${designLanguage.colors.white};
    font-size: 13px;

    ul, li {
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

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React)
}
const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <>
        <Style />
        <Header siteTitle="Dependency Page" />
        <Main>{children}</Main>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default Layout
