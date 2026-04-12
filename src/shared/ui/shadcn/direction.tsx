import * as React from 'react'

import { Direction } from 'radix-ui'

function DirectionProvider({
  children,
  dir,
  direction,
}: React.ComponentProps<typeof Direction.DirectionProvider> & {
  direction?: React.ComponentProps<typeof Direction.DirectionProvider>['dir']
}) {
  return <Direction.DirectionProvider dir={direction ?? dir}>{children}</Direction.DirectionProvider>
}

const useDirection = Direction.useDirection

export { DirectionProvider, useDirection }
