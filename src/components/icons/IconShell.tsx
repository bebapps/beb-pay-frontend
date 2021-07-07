export interface IconProps {
  size?: number | string;
  strokeWidth?: string;
}

const IconShell: React.FC<IconProps> = ({ children, size, strokeWidth }) => (
  <svg
    style={{
      strokeWidth: strokeWidth,
    }}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

IconShell.defaultProps = {
  size: 24,
  strokeWidth: 'var(--icon-stroke-width)',
};

export default IconShell;
