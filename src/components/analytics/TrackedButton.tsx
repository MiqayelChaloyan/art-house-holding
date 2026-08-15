'use client';

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

import { trackButtonClick } from '@/src/lib/analytics/tracking';

type TrackedButtonProps = ComponentPropsWithoutRef<'button'> & {
  trackName: string;
  children: ReactNode;
};

export function TrackedButton({
  trackName,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    trackButtonClick({ name: trackName });
    onClick?.(event);
  }

  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  );
}

type TrackedClickProps = {
  trackName: string;
  onClick?: () => void;
  children: (props: { onClick: () => void }) => ReactNode;
};

export function TrackedClick({ trackName, onClick, children }: TrackedClickProps) {
  function handleClick() {
    trackButtonClick({ name: trackName });
    onClick?.();
  }

  return <>{children({ onClick: handleClick })}</>;
}

export function trackCtaClick(name: string): void {
  trackButtonClick({ name });
}
