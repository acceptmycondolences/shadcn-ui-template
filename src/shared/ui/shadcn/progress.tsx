import * as React from 'react'

import { Progress as ProgressPrimitive } from 'radix-ui'

import { classNames } from '~/shared/lib'

function Progress({ className, value, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={classNames('relative flex h-3 w-full items-center overflow-x-hidden rounded-full bg-muted', className)}
      data-slot="progress"
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="size-full flex-1 bg-primary transition-all"
        data-slot="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
