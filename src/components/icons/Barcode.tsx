import IconShell, { IconProps } from './IconShell';

const Barcode: React.FC<IconProps> = (props) => (
  <IconShell {...props}>
    <path d="M18,18.765l1.647,-0.015c0.741,-0.003 1.35,-0.612 1.353,-1.353l0,-10.794c-0.003,-0.741 -0.612,-1.35 -1.353,-1.353l-1.647,0.015m-12,-0.015l-1.725,0.015c-0.744,0 -1.275,0.61 -1.275,1.354l0,10.794c0,0.744 0.531,1.352 1.275,1.352l1.725,-0.015m12,-9.75l0,6m-3,-7.5l0,9m-3,-8.25l0,7.5m-3,-8.25l0,9m-3,-7.5l0,6" />
  </IconShell>
);

export default Barcode;
