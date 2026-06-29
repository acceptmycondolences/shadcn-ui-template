import { createFileRoute } from '@tanstack/react-router'

import { LoginPage } from '~/pages/authentication/login'

export const Route = createFileRoute('/_authentication/login')({
  component: LoginPage,
})
