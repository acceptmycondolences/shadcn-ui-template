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

export type ControlledFieldProp =
  | 'aria-describedby'
  | 'aria-invalid'
  | 'aria-labelledby'
  | 'checked'
  | 'defaultChecked'
  | 'defaultValue'
  | 'id'
  | 'name'
  | 'onBlur'
  | 'onChange'
  | 'onCheckedChange'
  | 'ref'
  | 'value'

export interface FormBaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> {
  control: Control<TFieldValues, TTransformedValues>
  description?: ReactNode
  disabled?: boolean
  label: ReactNode
  name: TName
  orientation?: VariantProps<typeof fieldVariants>['orientation']
}

export interface FormComboboxFieldProps {
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
> = FormBaseFieldProps<TFieldValues, TName, TTransformedValues> &
  Omit<ComponentPropsWithoutRef<TElementType>, ControlledFieldProp>

export interface FormContainerFieldProps {
  containerChildren?: ReactNode
  containerClassName?: string
}

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormBaseFieldProps<TFieldValues, TName, TTransformedValues> & {
  children: (props: FormFieldRenderProps<TFieldValues, TName>) => ReactNode
}

export interface FormFieldRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  describedBy?: string
  descriptionId: string
  disabled?: boolean
  errorId: string
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
  inputId: string
  labelId: string
}

export interface FormSelectFieldProps {
  groups: SelectGroupItem[]
  placeholder?: string
}
