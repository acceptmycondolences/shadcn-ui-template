import { createFileRoute } from '@tanstack/react-router'

import { AuthenticatedLayout } from '~/app/layouts'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})
