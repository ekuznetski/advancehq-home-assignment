'use client';

import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {LoadingButton} from '@mui/lab';
import {Account} from '@/domain/Account';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import {Checkbox, FormControlLabel, Stack} from '@mui/material';
import {useMoveMoneyMutation} from '@/hooks/useMoveMoneyMutation';
import FlexxTextField from '@components/FlexxCustomTextInputs/FlexxTextField';
import {SelectOption} from '@components/FlexxCustomTextInputs/domain/FlexxTextFields.type';

interface MoveMoneyFormValues {
  source_account_id: string;
  destination_account_id: string;
  amount: string;
}

interface MoveMoneyFormProps {
  onSuccess?: () => void;
  defaultSourceAccountId?: string;
}

const toOption = (account: Account): SelectOption => ({
  id: account.account_id,
  value: account.account_id,
  label: `${account.name} (${account.bank_name})`,
});

const MoveMoneyForm: React.FC<MoveMoneyFormProps> = ({
  onSuccess,
  defaultSourceAccountId,
}) => {
  const {data: accounts} = useFetchAccounts();
  const [confirmed, setConfirmed] = useState(false);
  const {mutate, isPending} = useMoveMoneyMutation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {isValid},
  } = useForm<MoveMoneyFormValues>({
    mode: 'onChange',
    defaultValues: {
      source_account_id: defaultSourceAccountId ?? '',
      destination_account_id: '',
      amount: '',
    },
  });

  const sourceId = watch('source_account_id');
  const destinationId = watch('destination_account_id');
  const sourceAccount = accounts?.find(a => a.account_id === sourceId);

  // If the destination ends up equal to the source, clear it: it is excluded
  // from the options below, so RHF would otherwise keep a stale invalid value.
  useEffect(() => {
    if (destinationId && destinationId === sourceId) {
      setValue('destination_account_id', '', {shouldValidate: true});
    }
  }, [sourceId, destinationId, setValue]);

  const sourceOptions = (accounts ?? []).map(toOption);
  const destinationOptions = (accounts ?? [])
    .filter(account => account.account_id !== sourceId)
    .map(toOption);

  const onSubmit = handleSubmit(values => {
    if (!confirmed) return;
    mutate(
      {
        source_account_id: values.source_account_id,
        destination_account_id: values.destination_account_id,
        amount: Number(values.amount),
      },
      {onSuccess: () => onSuccess?.()},
    );
  });

  return (
    <Stack
      component='form'
      onSubmit={onSubmit}
      gap='0.5rem'
      flexGrow={1}
      noValidate
    >
      <Controller
        name='source_account_id'
        control={control}
        rules={{required: 'This field is required.'}}
        render={({field, fieldState}) => (
          <FlexxTextField
            select
            required
            fullWidth
            enablePortal
            name={field.name}
            options={sourceOptions}
            label='Source Account'
            placeholder='Select source account'
            value={field.value}
            onOptionChange={(_, option) => field.onChange(option?.value ?? '')}
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='destination_account_id'
        control={control}
        rules={{
          required: 'This field is required.',
          validate: value =>
            value !== sourceId || 'Source and destination must differ.',
        }}
        render={({field, fieldState}) => (
          <FlexxTextField
            select
            required
            fullWidth
            enablePortal
            name={field.name}
            options={destinationOptions}
            label='Destination Account'
            placeholder='Select destination account'
            value={field.value}
            onOptionChange={(_, option) => field.onChange(option?.value ?? '')}
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='amount'
        control={control}
        rules={{
          required: 'This field is required.',
          validate: value => {
            const amount = Number(value);
            if (!amount || amount <= 0)
              return 'Enter an amount greater than 0.';
            if (sourceAccount && amount > sourceAccount.balance)
              return 'Amount exceeds the source account balance.';
            return true;
          },
        }}
        render={({field, fieldState}) => (
          <FlexxTextField
            currency
            required
            fullWidth
            name={field.name}
            label='Amount'
            placeholder='Enter amount'
            value={field.value}
            onChange={field.onChange}
            externalError={!!fieldState.error}
            externalHelperText={fieldState.error?.message}
          />
        )}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={confirmed}
            onChange={event => setConfirmed(event.target.checked)}
          />
        }
        label='I confirm this transfer'
      />

      <LoadingButton
        type='submit'
        variant='contained'
        fullWidth
        disabled={!isValid || !confirmed}
        loading={isPending}
        sx={{mt: 1}}
      >
        Move Money
      </LoadingButton>
    </Stack>
  );
};

export default MoveMoneyForm;
