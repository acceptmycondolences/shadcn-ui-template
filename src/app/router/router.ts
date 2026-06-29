import { createRouter } from '@tanstack/react-router'

import { NotFoundPage } from '~/pages/not-found'

import { routeTree } from './generatedRouteTree'

export const router = createRouter({
  defaultNotFoundComponent: NotFoundPage,
  defaultStructuralSharing: true,
  defaultViewTransition: true,
  routeTree,
  scrollRestoration: true,
})
