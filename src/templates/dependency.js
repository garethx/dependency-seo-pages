import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 304px;
  grid-gap: 30px;
`

const Dependency = ({ data: { sandboxDependency } }) => {
  console.log(sandboxDependency)
  const downloads = sandboxDependency.info.npm.downloads

  return (
    <Layout>
      <h1>{sandboxDependency.dependency}</h1>
      <Main>
        <div>
          <h2>Sandboxes ID</h2>
          <ul>
            {sandboxDependency.sandboxes.map(a => (
              <li>{a.objectID}</li>
            ))}
          </ul>
        </div>
        <aside>
          <span>
            {downloads[downloads.length - 1].count} Downloads in the last year
          </span>
          <ul>
            {sandboxDependency.info.metadata.maintainers.map(maintainer => (
              <li>
                <img
                  src={`https://github.com/${maintainer.username}.png?size=40`}
                  alt={maintainer.username}
                  width="32"
                  height="32"
                />
              </li>
            ))}
          </ul>
        </aside>
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery($dependency: String) {
    sandboxDependency(dependency: { eq: $dependency }) {
      dependency
      size {
        size
      }
      info {
        npm {
          dependentsCount
          starsCount
          downloads {
            count
          }
        }
        metadata {
          description
          license
          version
          maintainers {
            username
          }
          links {
            bugs
            homepage
            npm
            repository
          }
        }
        github {
          issues {
            count
          }
          starsCount
        }
      }
      sandboxes {
        objectID
        title
        description
        like_count
        fork_count
        view_count
        template
      }
    }
  }
`

export default Dependency
