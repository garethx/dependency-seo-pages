import React from 'react'
import { Text, Element, Stack, Link } from '@codesandbox/components'
import designLanguage from '@codesandbox/components/lib/design-language/index'
import styled from 'styled-components'
import { GlobeIcon, GHIcon, IssuesIcon, NPMIcon } from './icons'

const Wrapper = styled(Element)`
  background: ${designLanguage.colors.grays[700]};
  border-radius: ${designLanguage.radii.small}px;
  border: 1px solid ${designLanguage.colors.grays[600]};
`
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const cleanURL = url => url.split('https://')[1]
const cleanNPM = url => url.split('https://www.npmjs.com/package/')[1]

const Sidebar = ({ sandboxes }) => {
  const downloads = sandboxes.info.npm.downloads
  const links = sandboxes.info.metadata.links

  console.log(sandboxes)
  return (
    <Wrapper as="aside" paddingX={16} paddingY={24}>
      <Text block weight="bold" size={19}>
        About
      </Text>
      <Text variant="muted" block marginTop={2}>
        {sandboxes.info.metadata.description}
      </Text>
      <Text block weight="bold" size={19} marginTop={9}>
        {numberWithCommas(downloads[2].count)}
      </Text>
      <Text variant="muted" block marginTop={1}>
        Weekly Downloads
      </Text>
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
            {sandboxes.info.metadata.version}
          </Text>
        </Element>
        <Element>
          <Text block variant="muted">
            License
          </Text>
          <Text block paddingTop={1}>
            {sandboxes.info.metadata.license}
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
        <Element>
          <Text block variant="muted">
            Size
          </Text>
          <Text block paddingTop={1}>
            {sandboxes.size.size / 1000}Kb
          </Text>
        </Element>
        <Element>
          <Text block variant="muted">
            Packages Using it
          </Text>
          <Text block paddingTop={1}>
            {sandboxes.info.npm.dependentsCount}
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
        <Element>
          <Text block variant="muted">
            Issues Count
          </Text>
          <Text block paddingTop={1}>
            {sandboxes.info.github.issues.count}
          </Text>
        </Element>
        <Element>
          <Text block variant="muted">
            Stars
          </Text>
          <Text block paddingTop={1}>
            {sandboxes.info.github.starsCount}
          </Text>
        </Element>
      </Element>
      <Text
        css={{ borderTop: '1px solid' + designLanguage.colors.grays[600] }}
        marginTop={28}
        paddingTop={4}
        block
        marginTop={4}
        weight="bold"
      >
        External Links
      </Text>

      <Stack align="center" gap={1} marginTop={4}>
        <GlobeIcon></GlobeIcon>
        <Link href={links.homepage}>{cleanURL(links.homepage)}</Link>
      </Stack>
      <Stack align="center" gap={1} marginTop={4}>
        <GHIcon></GHIcon>
        <Link href={links.repository}>{cleanURL(links.repository)}</Link>
      </Stack>
      <Stack align="center" gap={1} marginTop={4}>
        <IssuesIcon></IssuesIcon>
        <Link href={links.bugs}>{cleanURL(links.bugs)}</Link>
      </Stack>
      <Stack align="center" gap={1} marginTop={4}>
        <NPMIcon></NPMIcon>
        <Link href={links.npm}>@{cleanNPM(links.npm)}</Link>
      </Stack>
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
        {sandboxes.info.metadata.maintainers.map(maintainer => (
          <Element
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
        ))}
      </Stack>
    </Wrapper>
  )
}

export default Sidebar
