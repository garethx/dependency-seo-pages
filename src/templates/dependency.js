import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Text, Element, Stack, Link } from '@codesandbox/components'
import designLanguage from '@codesandbox/components/lib/design-language/index'
import getIcon from '@codesandbox/common/lib/templates/icons'
import Sidebar from '../components/sidebar'

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 30px;
  align-items: flex-start;

  @media screen and (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`

const Card = styled.div`
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

  return (
    <Layout>
      <SEO title={`CodeSandbox | ${name} sandboxes`} pkg={name} />
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
              <Card key={a.objectID}>
                <img
                  alt={a.title}
                  src={getScreenshot(a.objectID)}
                  height={162}
                  style={{ display: 'block' }}
                />
                <Element paddingX={4} paddingTop={2} paddingBottom={5}>
                  <Text block>{a.title}</Text>

                  <Text
                    block
                    marginTop={2}
                    variant="muted"
                    style={{ height: 28 }}
                  >
                    {a.description}
                  </Text>

                  <Stack align="center" justify="space-between" marginTop={5}>
                    {a.author ? (
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
                    ) : (
                      <Element />
                    )}
                    {getIcon(a.template)({})}
                  </Stack>
                </Element>
              </Card>
            ))}
          </List>
        </div>
        <Sidebar sandboxes={sandboxDependency} />
      </Main>
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
