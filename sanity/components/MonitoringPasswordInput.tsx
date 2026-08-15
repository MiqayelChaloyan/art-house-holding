'use client';

import { useCallback, useEffect, useState } from 'react';
import { Flex, TextInput, Button, Stack, Text } from '@sanity/ui';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import type { StringInputProps } from 'sanity';
import { set, unset, useFormValue } from 'sanity';

type PasswordFieldProps = StringInputProps & {
  placeholder: string;
};

function PasswordField({ onChange, value = '', placeholder }: PasswordFieldProps) {
  const [localValue, setLocalValue] = useState(typeof value === 'string' ? value : '');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLocalValue(typeof value === 'string' ? value : '');
  }, [value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.currentTarget.value;
      setLocalValue(next);
      onChange(next ? set(next) : unset());
    },
    [onChange],
  );

  return (
    <Flex gap={2} align="center">
      <Flex flex={1}>
        <TextInput
          type={visible ? 'text' : 'password'}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="new-password"
        />
      </Flex>
      <Button
        mode="ghost"
        icon={visible ? FiEyeOff : FiEye}
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((prev) => !prev)}
      />
    </Flex>
  );
}

/** View-only — value is set automatically on Publish; cannot edit or clear. */
export function MonitoringCurrentPasswordReadOnlyInput(props: StringInputProps) {
  const stored =
    typeof props.value === 'string' && props.value.length > 0 ? props.value : '';
  const passwordHash = useFormValue(['passwordHash']);
  const hasHash = typeof passwordHash === 'string' && passwordHash.length > 0;
  const [visible, setVisible] = useState(false);

  if (!stored) {
    if (hasHash) {
      return (
        <Text size={1} muted>
          Password is active. Publish a New Password once to display it here.
        </Text>
      );
    }

    return (
      <Text size={1} muted>
        Not set yet. Enter New Password below and Publish.
      </Text>
    );
  }

  return (
    <Flex gap={2} align="center">
      <Flex flex={1}>
        <TextInput
          type={visible ? 'text' : 'password'}
          value={stored}
          readOnly
          disabled
          autoComplete="off"
        />
      </Flex>
      <Button
        mode="ghost"
        icon={visible ? FiEyeOff : FiEye}
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((prev) => !prev)}
      />
    </Flex>
  );
}

export function MonitoringNewPasswordInput(props: StringInputProps) {
  const passwordHash = useFormValue(['passwordHash']);
  const currentPassword = useFormValue(['currentPassword']);
  const hasCurrent = Boolean(
    (typeof passwordHash === 'string' && passwordHash.length > 0) ||
      (typeof currentPassword === 'string' && currentPassword.length > 0),
  );

  return (
    <Stack space={2}>
      {hasCurrent ? (
        <Text size={1} muted>
          Leave empty to keep the current password. Enter a value only to replace it on Publish.
        </Text>
      ) : null}
      <PasswordField
        {...props}
        placeholder={hasCurrent ? 'Enter new password to replace' : 'Enter password'}
      />
    </Stack>
  );
}
