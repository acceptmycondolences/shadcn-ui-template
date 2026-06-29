import { useId, useState } from 'react'

import { IconSelector } from '@tabler/icons-react'
import { Controller, type FieldPath, type FieldPathByValue, type FieldValues } from 'react-hook-form'

import { classNames } from '~/shared/lib'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../shadcn/command'
import { Field, FieldDescription, FieldError, FieldLabel } from '../shadcn/field'
import { InputGroup, InputGroupInput, InputGroupTextarea } from '../shadcn/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../shadcn/select'
import type {
  FormComboboxFieldProps,
  FormComponentProps,
  FormContainerFieldProps,
  FormFieldProps,
  FormSelectFieldProps,
} from './form.props'

export function FormComboboxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<TFieldValues, string[]> = FieldPathByValue<TFieldValues, string[]>,
  TTransformedValues = TFieldValues,
>({
  className,
  control,
  description,
  disabled,
  emptyLabel,
  groups,
  label,
  name,
  orientation,
  searchPlaceholder,
  size = 'default',
  triggerPlaceholder,
  ...props
}: FormComboboxFieldProps & FormComponentProps<'button', TFieldValues, TName, TTransformedValues>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      description={description}
      disabled={disabled}
      label={label}
      name={name}
      orientation={orientation}
    >
      {({ describedBy, disabled: fieldDisabled, field, fieldState, inputId, labelId }) => {
        const selectedValues: string[] = field.value ?? []

        const allOptions = groups.flatMap((group) => group.options)

        const lastLabel =
          selectedValues.length > 0
            ? allOptions.find((allOption) => allOption.value === selectedValues.at(-1))?.label
            : null

        const triggerLabel = lastLabel
          ? selectedValues.length >= 2 && typeof lastLabel === 'string'
            ? `${lastLabel} (${String(selectedValues.length)})`
            : lastLabel
          : triggerPlaceholder

        const handleSelect = (newValue: string) => {
          const newValues = selectedValues.includes(newValue)
            ? selectedValues.filter((selectedValue) => selectedValue !== newValue)
            : [...selectedValues, newValue]

          field.onChange(newValues)
        }

        return (
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <button
                aria-describedby={describedBy}
                aria-invalid={fieldState.invalid}
                aria-labelledby={labelId}
                className={classNames(
                  "flex w-fit items-center justify-between gap-1.5 rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-9 data-[size=sm]:h-8 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                  lastLabel ? 'line-clamp-1 flex items-center gap-1.5' : 'text-muted-foreground',
                  className,
                )}
                data-size={size}
                data-slot="combobox-trigger"
                disabled={fieldDisabled}
                id={inputId}
                onBlur={field.onBlur}
                ref={field.ref}
                role="combobox"
                type="button"
                {...props}
              >
                {triggerLabel}
                <IconSelector className="pointer-events-none size-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-h-(--radix-popover-content-available-height) min-h-(--radix-popover-trigger-height) w-full max-w-(--radix-popover-content-available-width) min-w-(--radix-popover-trigger-width) p-0 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyLabel}</CommandEmpty>
                  {groups.map((group) => (
                    <CommandGroup heading={group.label} key={group.id}>
                      {group.options.map((option) => (
                        <CommandItem
                          data-checked={selectedValues.includes(option.value)}
                          key={option.value}
                          onSelect={handleSelect}
                          value={option.value}
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )
      }}
    </FormField>
  )
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  description,
  disabled,
  label,
  name,
  orientation = 'vertical',
}: FormFieldProps<TFieldValues, TName, TTransformedValues>) {
  const inputId = useId()
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const describedBy = [description ? descriptionId : null, fieldState.error ? errorId : null]
          .filter(Boolean)
          .join(' ')

        const fieldDisabled = disabled ?? field.disabled

        return (
          <Field data-disabled={fieldDisabled} data-invalid={fieldState.invalid} orientation={orientation}>
            <FieldLabel htmlFor={inputId} id={labelId}>
              {label}
            </FieldLabel>
            {children({
              describedBy: describedBy || undefined,
              disabled: fieldDisabled,
              field,
              fieldState,
              formState,
              inputId,
              labelId,
            })}
            {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
            {fieldState.error && <FieldError errors={[fieldState.error]} id={errorId} />}
          </Field>
        )
      }}
    />
  )
}

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  autoComplete = 'off',
  containerChildren,
  containerClassName,
  control,
  description,
  disabled,
  label,
  name,
  orientation,
  ...props
}: FormComponentProps<typeof InputGroupInput, TFieldValues, TName, TTransformedValues> & FormContainerFieldProps) {
  return (
    <FormField
      control={control}
      description={description}
      disabled={disabled}
      label={label}
      name={name}
      orientation={orientation}
    >
      {({ describedBy, disabled: fieldDisabled, field, fieldState, inputId }) => (
        <InputGroup className={containerClassName} data-disabled={fieldDisabled}>
          <InputGroupInput
            {...props}
            {...field}
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            disabled={fieldDisabled}
            id={inputId}
          />
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
  disabled,
  groups,
  label,
  name,
  orientation,
  placeholder,
  ...props
}: FormComponentProps<typeof SelectTrigger, TFieldValues, TName, TTransformedValues> & FormSelectFieldProps) {
  return (
    <FormField
      control={control}
      description={description}
      disabled={disabled}
      label={label}
      name={name}
      orientation={orientation}
    >
      {({ describedBy, disabled: fieldDisabled, field, fieldState, inputId, labelId }) => (
        <Select disabled={fieldDisabled} name={field.name} onValueChange={field.onChange} value={field.value ?? ''}>
          <SelectTrigger
            {...props}
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            aria-labelledby={labelId}
            disabled={fieldDisabled}
            id={inputId}
            onBlur={field.onBlur}
            ref={field.ref}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
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
  disabled,
  label,
  name,
  orientation,
  ...props
}: FormComponentProps<typeof InputGroupTextarea, TFieldValues, TName, TTransformedValues> & FormContainerFieldProps) {
  return (
    <FormField
      control={control}
      description={description}
      disabled={disabled}
      label={label}
      name={name}
      orientation={orientation}
    >
      {({ describedBy, disabled: fieldDisabled, field, fieldState, inputId }) => (
        <InputGroup className={containerClassName} data-disabled={fieldDisabled}>
          <InputGroupTextarea
            {...props}
            {...field}
            aria-describedby={describedBy}
            aria-invalid={fieldState.invalid}
            disabled={fieldDisabled}
            id={inputId}
          />
          {containerChildren}
        </InputGroup>
      )}
    </FormField>
  )
}
