import Button from '../inputs/Button';
import Barcode from '../icons/Barcode';
import css from './ScanButton.module.scss';

interface ScanButtonProps {
  onClick: () => void;
}

const ScanButton: React.FC<ScanButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={css.ScanButton}
    >
      <Barcode
        strokeWidth="calc(var(--icon-stroke-width) / 2)"
        size={38}
      />
    </Button>
  );
};

export default ScanButton;
