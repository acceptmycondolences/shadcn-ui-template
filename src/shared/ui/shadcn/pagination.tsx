import * as React from 'react'

import { IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react'

import { classNames } from '~/shared/lib'
import { Button } from '~/shared/ui'

type PaginationLinkProps = Pick<React.ComponentProps<typeof Button>, 'size'> & React.ComponentProps<'a'> &
  {
  isActive?: boolean
}

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="pagination"
      className={classNames('mx-auto flex w-full justify-center', className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={classNames('flex items-center gap-1', className)} data-slot="pagination-content" {...props} />
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={classNames("flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <IconDots />
      <span className="sr-only">More pages</span>
    </span>
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <Button asChild className={classNames(className)} size={size} variant={isActive ? 'outline' : 'ghost'}>
      <a aria-current={isActive ? 'page' : undefined} data-active={isActive} data-slot="pagination-link" {...props} />
    </Button>
  )
}

function PaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Go to next page" className={classNames('pr-2!', className)} size="default" {...props}>
      <span className="hidden sm:block">{text}</span>
      <IconChevronRight data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={classNames('pl-2!', className)}
      size="default"
      {...props}
    >
      <IconChevronLeft data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
