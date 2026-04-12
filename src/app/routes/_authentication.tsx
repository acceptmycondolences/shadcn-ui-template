import { createFileRoute } from '@tanstack/react-router'

import { AuthenticationLayout } from '~/app/layouts'

export const Route = createFileRoute('/_authentication')({
  component: AuthenticationLayout,
})
