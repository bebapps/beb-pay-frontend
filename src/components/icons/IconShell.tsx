export interface IconProps {
  size?: number | string;
}

const IconShell: React.FC<IconProps> = ({ children, size }) => (
  <svg
    style={{
      strokeWidth: 'var(--icon-stroke-width)',
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
};

export default IconShell;
