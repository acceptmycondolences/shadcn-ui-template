import { IconLoader } from '@tabler/icons-react'

import { classNames } from '~/shared/lib'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <IconLoader
      aria-label="Loading"
      className={classNames('size-4 animate-spin', className)}
      role="status"
      {...props}
    />
  )
}

export { Spinner }
