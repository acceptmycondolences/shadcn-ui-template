import type { ReactNode } from 'react'

export interface SelectGroupItem {
  id: number
  label?: ReactNode
  options: SelectOption[]
}

export interface SelectOption {
  label: ReactNode
  value: string
}
