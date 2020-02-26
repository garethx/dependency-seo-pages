import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Main from '../components/main'
import SEO from '../components/seo'

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const Dependency = ({ data: { sandboxDependency } }) => {
  const name = sandboxDependency.dependency
    .split('-')
    .map(a => capitalize(a))
    .join(' ')

  return (
    <Layout>
      <SEO title={`${name} examples - CodeSandbox`} pkg={name} />
      <Main name={name} dependency={sandboxDependency} />
    </Layout>
  )
}

export const query = graphql`
  query MyQuery($dependency: String) {
    sandboxDependency(dependency: { eq: $dependency }) {
      dependency
      sandboxes {
        objectID
        title
        description
        template
        author {
          username
          avatar_url
        }
      }
    }
  }
`

export default Dependency
