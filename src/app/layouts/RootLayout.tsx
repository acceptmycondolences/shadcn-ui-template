import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
