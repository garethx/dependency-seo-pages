import React, { useState, useEffect } from 'react'
import { Text, Element, Stack, Link } from '@codesandbox/components'
import designLanguage from '@codesandbox/components/lib/design-language/index'
import styled from 'styled-components'
import { GlobeIcon, GHIcon, IssuesIcon, NPMIcon } from './icons'

const Wrapper = styled(Element)`
  background: ${designLanguage.colors.grays[700]};
  border-radius: ${designLanguage.radii.medium}px;
  border: 1px solid ${designLanguage.colors.grays[600]};
  position: sticky;
  top: 20px;
  padding: 2rem;
  grid-area: aside;
  height: min-content;
  overflow: hidden;
`

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const cleanURL = url => url.split('https://')[1]
const cleanNPM = url =>
  url
    .split('https://www.npmjs.com/package/')[1]
    .replace(/%2F/g, '/')
    .replace(/%40/g, '')

const getInfo = async name => {
  const data = await fetch(
    `https://api.npms.io/v2/package/${name
      .replace(/\//g, '%2F')
      .replace(/@/g, '%40')}`
  ).then(rsp => rsp.json())

  return data.collected
}

const getSize = async name => {
  const data = await fetch(
    `https://bundlephobia.com/api/size?package=${name}`
  ).then(rsp => rsp.json())

  return data
}

const Sidebar = ({ sandboxes }) => {
  const [info, setInfo] = useState({})
  const [size, setSize] = useState({})

  useEffect(() => {
    if (!info.metadata) {
      getInfo(sandboxes.dependency).then(setInfo)
    }
    if (!size.size) {
      getSize(sandboxes.dependency).then(setSize)
    }
  }, [])

  const downloads = info ? (info.npm || {}).downloads : 0
  const links = info ? (info.metadata || {}).links : {}

  if (!info) return null

  return info.metadata ? (
    <Wrapper as="aside">
      <Text block weight="bold" size={19}>
        About
      </Text>
      <Text
        variant="muted"
        block
        marginTop={2}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {info.metadata.description}
      </Text>
      {downloads && (
        <>
          <Text block weight="bold" size={19} marginTop={9}>
            {numberWithCommas(downloads[1].count)}
          </Text>
          <Text variant="muted" block marginTop={1}>
            Weekly Downloads
          </Text>
        </>
      )}
      <Element
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid' + designLanguage.colors.grays[600]
        }}
        marginTop={28}
        paddingTop={4}
      >
        <Element>
          <Text block variant="muted">
            Latest version
          </Text>
          <Text block paddingTop={1}>
            {info.metadata.version}
          </Text>
        </Element>
        <Element>
          <Text block variant="muted">
            License
          </Text>
          <Text block paddingTop={1}>
            {info.metadata.license}
          </Text>
        </Element>
      </Element>
      <Element
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}
        paddingTop={4}
      >
        {size.size && (
          <Element>
            <Text block variant="muted">
              Size
            </Text>
            <Text block paddingTop={1}>
              {size.size / 1000}Kb
            </Text>
          </Element>
        )}
        {info.npm && (
          <Element>
            <Text block variant="muted">
              Packages Using it
            </Text>
            <Text block paddingTop={1}>
              {info.npm.dependentsCount}
            </Text>
          </Element>
        )}
      </Element>
      {info.github && (
        <Element
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
          }}
          paddingTop={4}
        >
          <Element>
            <Text block variant="muted">
              Issues Count
            </Text>
            <Text block paddingTop={1}>
              {info.github.issues.count}
            </Text>
          </Element>
          <Element>
            <Text block variant="muted">
              Stars
            </Text>
            <Text block paddingTop={1}>
              {info.github.starsCount}
            </Text>
          </Element>
        </Element>
      )}
      <Text
        css={{ borderTop: '1px solid' + designLanguage.colors.grays[600] }}
        marginTop={28}
        paddingTop={4}
        block
        weight="bold"
      >
        External Links
      </Text>

      {links.homepage && (
        <Stack align="center" gap={2} marginTop={4}>
          <GlobeIcon> </GlobeIcon>
          <Link href={links.homepage}>{cleanURL(links.homepage)}</Link>
        </Stack>
      )}
      {links.repository && (
        <Stack align="center" gap={2} marginTop={4}>
          <GHIcon></GHIcon>
          <Link href={links.repository}>{cleanURL(links.repository)}</Link>
        </Stack>
      )}
      {links.bugs && (
        <Stack align="center" gap={2} marginTop={4}>
          <IssuesIcon></IssuesIcon>
          <Link href={links.bugs}>{cleanURL(links.bugs)}</Link>
        </Stack>
      )}
      {links.npm && (
        <Stack align="center" gap={2} marginTop={4}>
          <NPMIcon></NPMIcon>
          <Link href={links.npm}>@{cleanNPM(links.npm)}</Link>
        </Stack>
      )}
      {info.metadata.maintainers && (
        <>
          <Text
            block
            css={{ borderTop: '1px solid' + designLanguage.colors.grays[600] }}
            marginTop={28}
            paddingTop={4}
            weight="bold"
          >
            Collaborators
          </Text>
          <Stack
            marginTop={16}
            css={{
              flexWrap: 'wrap',

              img: {
                marginBottom: 8
              }
            }}
            gap={2}
          >
            {info.metadata.maintainers.map(maintainer => (
              <Link
                key={maintainer.username}
                href={`https://github.com/${maintainer.username}`}
              >
                <Element
                  key={maintainer.username}
                  as="img"
                  css={{
                    'border-radius': designLanguage.radii.small + 'px',
                    border: '1px solid' + designLanguage.colors.grays[600]
                  }}
                  src={`https://github.com/${maintainer.username}.png?size=40`}
                  alt={maintainer.username}
                  width="32"
                  height="32"
                />
              </Link>
            ))}
          </Stack>
        </>
      )}
    </Wrapper>
  ) : (
    <Wrapper as="aside" paddingX={16} paddingY={24}></Wrapper>
  )
}

export default Sidebar
