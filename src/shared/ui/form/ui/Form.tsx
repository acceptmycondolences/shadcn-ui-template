import { useId } from 'react'

import { Controller, type FieldPath, type FieldValues } from 'react-hook-form'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  type FormComponentProps,
  type FormFieldProps,
  type FormInputProps,
  type FormSelectProps,
  type FormTextareaProps,
} from '~/shared/ui'

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  description,
  label,
  name,
  orientation = 'vertical',
}: FormFieldProps<TFieldValues, TName, TTransformedValues>) {
  const id = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <Field data-invalid={fieldState.invalid} orientation={orientation}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {children({
            field,
            fieldState,
            formState,
            id,
          })}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  containerChildren,
  containerClassName,
  control,
  description,
  label,
  name,
  orientation,
  ...props
}: FormComponentProps<typeof InputGroupInput, TFieldValues, TName, TTransformedValues> & FormInputProps) {
  return (
    <FormField control={control} description={description} label={label} name={name} orientation={orientation}>
      {({ field, fieldState, id }) => (
        <InputGroup className={containerClassName}>
          <InputGroupInput aria-invalid={fieldState.invalid} id={id} {...field} {...props} />
          {containerChildren}
        </InputGroup>
      )}
    </FormField>
  )
}

export function FormSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  description,
  groups,
  label,
  name,
  orientation,
  placeholder,
  ...props
}: FormComponentProps<typeof SelectTrigger, TFieldValues, TName, TTransformedValues> & FormSelectProps) {
  return (
    <FormField control={control} description={description} label={label} name={name} orientation={orientation}>
      {({ field, fieldState, id }) => (
        <Select disabled={field.disabled} name={field.name} onValueChange={field.onChange} value={field.value ?? ''}>
          <SelectTrigger
            aria-invalid={fieldState.invalid}
            aria-labelledby={id}
            id={id}
            onBlur={field.onBlur}
            ref={field.ref}
            {...props}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectGroup key={group.id}>
                {group.label && <SelectLabel>{group.label}</SelectLabel>}
                {group.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  )
}

export function FormTextareaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  containerChildren,
  containerClassName,
  control,
  description,
  label,
  name,
  orientation,
  ...props
}: FormComponentProps<typeof InputGroupTextarea, TFieldValues, TName, TTransformedValues> & FormTextareaProps) {
  return (
    <FormField control={control} description={description} label={label} name={name} orientation={orientation}>
      {({ field, fieldState, id }) => (
        <InputGroup className={containerClassName}>
          <InputGroupTextarea aria-invalid={fieldState.invalid} id={id} {...field} {...props} />
          {containerChildren}
        </InputGroup>
      )}
    </FormField>
  )
}
