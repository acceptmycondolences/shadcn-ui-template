import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '~/pages/authenticated'

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
})
