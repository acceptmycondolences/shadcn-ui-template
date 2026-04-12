import * as React from 'react'

import { IconChevronRight, IconDots } from '@tabler/icons-react'
import { Slot } from 'radix-ui'

import { classNames } from '~/shared/lib'

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" className={classNames(className)} data-slot="breadcrumb" {...props} />
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      className={classNames('flex size-5 items-center justify-center [&>svg]:size-4', className)}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <IconDots />
      <span className="sr-only">More</span>
    </span>
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li className={classNames('inline-flex items-center gap-1.5', className)} data-slot="breadcrumb-item" {...props} />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : 'a'

  return (
    <Comp
      className={classNames('transition-colors hover:text-foreground', className)}
      data-slot="breadcrumb-link"
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      className={classNames(
        'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5',
        className,
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-current="page"
      aria-disabled="true"
      className={classNames('font-normal text-foreground', className)}
      data-slot="breadcrumb-page"
      role="link"
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      aria-hidden="true"
      className={classNames('[&>svg]:size-3.5', className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <IconChevronRight />}
    </li>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
