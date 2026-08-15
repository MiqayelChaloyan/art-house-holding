export function MonitoringIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="monitoringGradient" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B8DEF" />
          <stop offset="1" stopColor="#3DD68C" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#monitoringGradient)" />
      <path
        d="M14 30L20 22L26 26L34 16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="16" r="2.5" fill="white" />
      <rect x="13" y="31" width="22" height="3" rx="1.5" fill="white" fillOpacity="0.85" />
    </svg>
  );
}
