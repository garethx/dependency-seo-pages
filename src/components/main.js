import React from 'react'
import { Text, Element, Stack, Link, Button } from '@codesandbox/components'
import getIcon from '@codesandbox/common/lib/templates/icons'
import styled from 'styled-components'
import designLanguage from '@codesandbox/components/lib/design-language/index'
import Sidebar from './sidebar'

const ScreenShot = styled.img`
  object-fit: cover;
  display: block;
  object-position: 50% 50%;
`

const MainComponent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  grid-gap: 30px;
  align-items: flex-start;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${designLanguage.colors.grays[700]};
  border-radius: ${designLanguage.radii.medium}px;
  border: 1px solid ${designLanguage.colors.grays[600]};
  width: 310px;
  max-width: 100%;

  svg {
    width: 24px;
    height: 24px;
    filter: grayscale(1);
  }

  .screenshot {
    width: 100%;
  }

  @media screen and (max-width: 1640px) {
    width: 250px;
  }

  @media screen and (max-width: 1400px) {
    width: 310px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const getScreenshot = id =>
  `https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`

const Main = ({ name, dependency }) => {
  return (
    <>
      <Text style={{ margin: 0 }} as="h1" weight="400" size={40} block>
        {name} Examples
      </Text>
      <Text
        as="h2"
        weight="400"
        marginBottom={10}
        marginTop={2}
        block
        variant="muted"
        style={{ maxWidth: 600 }}
      >
        Learn how to use {name} by viewing and forking example apps that make use of {name} on
        CodeSandbox.
      </Text>
      <MainComponent>
        <div>
          <List>
            {dependency.sandboxes.slice(0, 12).map(a => (
              <Card key={a.objectID}>
                <Link href={`https://codesandbox.io/s/${a.objectID}`}>
                  <ScreenShot
                    className="screenshot"
                    alt={a.title}
                    src={getScreenshot(a.objectID)}
                    height={162}
                  />
                </Link>
                <Element
                  paddingX={4}
                  paddingTop={4}
                  paddingBottom={5}
                  style={{
                    height: 158,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <Link href={`https://codesandbox.io/s/${a.objectID}`}>
                      <Text block>{a.title || a.objectID}</Text>
                    </Link>

                    <Link href={`https://codesandbox.io/s/${a.objectID}`}>
                      <Text
                        block
                        marginTop={2}
                        variant="muted"
                        style={{
                          height: 28,
                          wordBreak: 'break-all',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          '-webkit-line-clamp': '2',
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {a.description}
                      </Text>
                    </Link>
                  </div>
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
                          href={`https://codesandbox.io/u/${a.author.username}`}
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
          {dependency.sandboxes.length >= 12 && (
            <Button
              as="a"
              marginTop={4}
              style={{ textDecoration: 'none' }}
              href={`https://codesandbox.io/search?refinementList%5Btemplate%5D=&refinementList%5Bnpm_dependencies.dependency%5D%5B0%5D=${dependency.dependency}&page=2&configure%5BhitsPerPage%5D=12`}
              variant="secondary"
            >
              Next Page
            </Button>
          )}
        </div>
        <Sidebar sandboxes={dependency} />
      </MainComponent>
    </>
  )
}

export default Main
