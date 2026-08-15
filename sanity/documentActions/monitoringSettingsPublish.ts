'use client';

import { useCallback } from 'react';
import bcrypt from 'bcryptjs';
import { useClient, useDocumentOperation, type DocumentActionComponent } from 'sanity';

interface DraftCredentials {
  newPassword?: string;
}

interface PublishedCredentials {
  passwordHash?: string;
}

/**
 * On publish: if New Password is set, save it as currentPassword (Studio view) and passwordHash (login).
 * currentPassword is read-only in Studio — only updated here, never cleared by users.
 */
export const MonitoringSettingsPublishAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type);
  const client = useClient({ apiVersion: '2024-03-02' });

  const onHandle = useCallback(async () => {
    const draftId = props.draft?._id ?? `drafts.${props.id}`;

    const [draft, published] = await Promise.all([
      client.fetch<DraftCredentials | null>(`*[_id == $id][0]{ newPassword }`, {
        id: draftId,
      }),
      client.fetch<PublishedCredentials | null>(`*[_id == $id][0]{ passwordHash }`, {
        id: props.id,
      }),
    ]);

    const newPassword =
      typeof draft?.newPassword === 'string' ? draft.newPassword.trim() : '';
    const hasActivePassword = Boolean(published?.passwordHash);

    if (!hasActivePassword && !newPassword) {
      throw new Error('First setup: enter New Password, then Publish.');
    }

    if (newPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await client
        .patch(draftId)
        .set({
          currentPassword: newPassword,
          passwordHash,
          updatedAt: new Date().toISOString(),
        })
        .unset(['newPassword'])
        .commit();
    } else if (draft?.newPassword !== undefined) {
      await client.patch(draftId).unset(['newPassword']).commit();
    }

    publish.execute();
  }, [client, props.draft?._id, props.id, publish]);

  if (props.type !== 'monitoringSettings') {
    return null;
  }

  return {
    label: 'Publish',
    disabled: Boolean(publish.disabled),
    onHandle,
  };
};
