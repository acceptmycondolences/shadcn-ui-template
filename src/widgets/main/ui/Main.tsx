import { Outlet } from '@tanstack/react-router'

export function Main() {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  )
}
