import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '~/pages/authentication'

export const Route = createFileRoute('/_authentication/login')({
  component: LoginPage,
})
