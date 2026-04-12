import { RouterProvider } from '@tanstack/react-router'

import { router } from '~/app/router'

export function Providers() {
  return <RouterProvider router={router} />
}
