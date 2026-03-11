interface HexLogoProps {
  size?: number;
  className?: string;
}

export function HexLogo({ size = 42, className }: HexLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 84 96"
      fill="none"
      width={size}
      height={size}
      className={className}
    >
      <title>Logo</title>
      <g transform="translate(-8, -2)">
        <g transform="translate(11, 5)">
          <polygon
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="39 0 0 22 0 67 39 90 78 68 78 23"
          />
          <text
            x="39"
            y="62"
            fill="currentColor"
            fontSize="50"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            fontWeight="400"
          >
            G
          </text>
        </g>
      </g>
    </svg>
  );
}
