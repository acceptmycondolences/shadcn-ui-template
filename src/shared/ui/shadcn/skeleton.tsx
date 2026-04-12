import { classNames } from '~/shared/lib'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={classNames('animate-pulse rounded-2xl bg-muted', className)} data-slot="skeleton" {...props} />
}

export { Skeleton }
