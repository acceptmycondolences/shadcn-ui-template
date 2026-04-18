import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import type { VariantProps } from 'class-variance-authority'
import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form'

import type { SelectGroupItem } from '~/shared/lib'
import type { fieldVariants } from '~/shared/ui'

export interface FormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> {
  control: Control<TFieldValues, unknown, TTransformedValues>
  description?: ReactNode
  label: ReactNode
  name: TName
  orientation?: VariantProps<typeof fieldVariants>['orientation']
}

export interface FormComboboxProps {
  emptyLabel: string
  groups: SelectGroupItem[]
  searchPlaceholder: string
  size?: 'default' | 'sm'
  triggerPlaceholder: string
}

export type FormComponentProps<
  TElementType extends ElementType,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormBaseProps<TFieldValues, TName, TTransformedValues> & Omit<ComponentPropsWithoutRef<TElementType>, 'name'>

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormBaseProps<TFieldValues, TName, TTransformedValues> & {
  children: (props: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
    id: string
  }) => ReactNode
}

export interface FormInputProps {
  containerChildren?: ReactNode
  containerClassName?: string
}

export interface FormSelectProps {
  groups: SelectGroupItem[]
  placeholder?: string
}

export interface FormTextareaProps {
  containerChildren?: ReactNode
  containerClassName?: string
}
