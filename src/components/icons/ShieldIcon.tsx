import React from 'react';

interface ShieldIconProps {
  className?: string;
}

export const ShieldIcon: React.FC<ShieldIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L4 6V12C4 16.4183 7.58172 20 12 22C16.4183 20 20 16.4183 20 12V6L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShieldLockIcon: React.FC<ShieldIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L4 6V12C4 16.4183 7.58172 20 12 22C16.4183 20 20 16.4183 20 12V6L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="9"
      y="10"
      width="6"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10 10V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const BlockchainIcon: React.FC<ShieldIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="15" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 6H15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 9V15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 9V15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
