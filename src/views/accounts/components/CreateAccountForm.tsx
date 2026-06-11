'use client';

import React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {Stack} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Account, CreateAccountPayload} from '@/domain/Account';
import {useCreateAccountMutation} from '@/hooks/useCreateAccountMutation';
import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import {buildValidationRules} from '@components/FlexxCustomTextInputs/domain/FlexxTextFieldValidators';

interface CreateAccountFormProps {
  onCreated?: (account: Account) => void;
}

const DEFAULT_VALUES: CreateAccountPayload = {
  name: '',
  bank_name: '',
  routing_number: '',
  account_number: '',
};

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({onCreated}) => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<CreateAccountPayload>({
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const {mutate, isPending} = useCreateAccountMutation();

  const onSubmit = handleSubmit(values =>
    mutate(values, {onSuccess: account => onCreated?.(account)}),
  );

  return (
    <Stack
      component='form'
      onSubmit={onSubmit}
      gap='0.5rem'
      flexGrow={1}
      noValidate
    >
      <Controller
        name='name'
        control={control}
        rules={buildValidationRules({required: true, accountName: true})}
        render={({field, fieldState}) => (
          <FlexxTextField
            {...field}
            required
            accountName
            fullWidth
            label='Account Name'
            placeholder='Enter account name'
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='bank_name'
        control={control}
        rules={buildValidationRules({required: true})}
        render={({field, fieldState}) => (
          <FlexxTextField
            {...field}
            required
            fullWidth
            label='Bank Name'
            placeholder='Enter bank name'
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='routing_number'
        control={control}
        rules={{
          required: 'This field is required.',
          pattern: {
            value: /^\d{9}$/,
            message: 'Routing number must be exactly 9 digits.',
          },
        }}
        render={({field, fieldState}) => (
          <FlexxTextField
            {...field}
            required
            fullWidth
            label='Routing Number'
            placeholder='Enter routing number'
            inputProps={{maxLength: 9, inputMode: 'numeric'}}
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='account_number'
        control={control}
        rules={buildValidationRules({required: true})}
        render={({field, fieldState}) => (
          <FlexxTextField
            {...field}
            required
            fullWidth
            label='Account Number'
            placeholder='Enter account number'
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <LoadingButton
        type='submit'
        variant='contained'
        fullWidth
        disabled={!isValid}
        loading={isPending}
        sx={{mt: 1}}
      >
        Add Account
      </LoadingButton>
    </Stack>
  );
};

export default CreateAccountForm;
