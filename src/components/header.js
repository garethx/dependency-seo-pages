import React, { useState } from 'react'
import {
  Stack,
  Element,
  Button,
  Link,
  SearchInput
} from '@codesandbox/components'
import Logo from './logo'
import designLanguage from '@codesandbox/components/lib/design-language/index'

const Header = () => {
  const [value, setValue] = useState('')
  return (
    <Stack
      align="center"
      justify="space-between"
      as="header"
      paddingY={3}
      paddingX={6}
      marginBottom={52}
      css={{
        borderBottom: '1px solid',
        borderColor: designLanguage.colors.grays[600]
      }}
    >
      <Link to="https://codesandbox.io">
        <Logo />
      </Link>
      <Stack gap={6} align="center">
        <SearchInput
          placeholder="Search CodeSandbox"
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter' && typeof window !== undefined) {
              window.location.href = `https://codesandbox.io/search?query=${value}&page=1&configure%5BhitsPerPage%5D=12`
            }
          }}
        />
        <Button
          style={{ textDecoration: 'none', width: 110 }}
          as="a"
          href="https://codesandbox.io/s"
          variant="secondary"
        >
          Create Sandbox
        </Button>
      </Stack>
    </Stack>
  )
}

export default Header
