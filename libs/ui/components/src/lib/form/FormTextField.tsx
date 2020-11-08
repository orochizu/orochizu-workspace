import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { FormControl, Grid, TextField } from '@material-ui/core';

interface Props {
  id: string;
  name: string;
  type: 'text' | 'email' | 'password';
  defaultValue: string;
  control: Control;
  size: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  variant?: 'contained' | 'outlined';
  label?: string;
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  hasError?: boolean;
}

export function FormTextField(props: Props): JSX.Element {
  const {
    id,
    name,
    type,
    defaultValue,
    control,
    size,
    variant,
    label,
    className,
    isDisabled,
    isRequired,
    hasError,
  } = props;
  return (
    <Grid item xs={size} className={className}>
      <FormControl fullWidth>
        <Controller
          as={<TextField />}
          control={control}
          id={id}
          name={name}
          type={type}
          label={label}
          error={hasError}
          variant={variant}
          defaultValue={defaultValue}
          disabled={isDisabled}
          rules={{ required: isRequired }}
        />
      </FormControl>
    </Grid>
  );
}
