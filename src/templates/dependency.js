import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Text, Element, Stack, Link } from '@codesandbox/components'
import designLanguage from '@codesandbox/components/lib/design-language/index'
import getIcon from '@codesandbox/common/lib/templates/icons'

const Main = styled(Element)`
  display: grid;
  grid-template-columns: 1fr 304px;
  grid-gap: 30px;

  @media screen and (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`

const List = styled(Element)`
  display: grid;
  grid-template-columns: repeat(2, 305px);
  grid-gap: 30px;
`

const Card = styled(Element)`
  background: ${designLanguage.colors.grays[700]};
  border-radius: ${designLanguage.radii.small}px;
  border: 1px solid ${designLanguage.colors.grays[600]};
  max-width: 310px;
`

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const getScreenshot = id =>
  `https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`

const Dependency = ({ data: { sandboxDependency } }) => {
  const name = sandboxDependency.dependency
    .split('-')
    .map(a => capitalize(a))
    .join(' ')
  const downloads = sandboxDependency.info.npm.downloads

  return (
    <Layout>
      <Text size={40} block>
        {name} Examples
      </Text>
      <Text
        marginBottom={10}
        marginTop={2}
        block
        variant="muted"
        style={{ maxWidth: 600 }}
      >
        Learn how to use {name} by viewing and forking {name} examples apps on
        CodeSandbox
      </Text>
      <Main>
        <div>
          <List>
            {sandboxDependency.sandboxes.map(a => (
              <Card>
                <img
                  alt={a.title}
                  src={getScreenshot(a.objectID)}
                  height={162}
                  style={{ display: 'block' }}
                />
                <Element paddingX={4} paddingTop={2} paddingBottom={5}>
                  <Text block>{a.title}</Text>

                  <Text block marginTop={2} variant="muted">
                    {a.description}
                  </Text>

                  <Stack align="center" justify="space-between" marginTop={5}>
                    {a.author && (
                      <Stack align="center" gap={2}>
                        <img
                          width={24}
                          height={24}
                          src={a.author.avatar_url}
                          alt={a.author.username}
                        />

                        <Link
                          href={`https//codesandbox.io/u/${a.author.username}`}
                        >
                          {a.author.username}
                        </Link>
                      </Stack>
                    )}
                    {getIcon(a.template)({})}
                  </Stack>
                </Element>
              </Card>
            ))}
          </List>
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
