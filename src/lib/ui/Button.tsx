'use client';

import type { ReactNode } from 'react';

import { trackButtonClick } from '@/src/lib/analytics/tracking';

type ButtonProps = {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
  trackName?: string;
};

function Button({ text, onClick, className, trackName }: ButtonProps) {
  const handleClick = () => {
    if (trackName) {
      trackButtonClick({ name: trackName });
    }

    onClick?.();
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      <span>{text}</span>
    </button>
  );
}

export default Button;
