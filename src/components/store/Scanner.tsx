import classNames from 'classnames';
import Button from '../inputs/Button';
import css from './Scanner.module.scss';

interface ScannerProps {
  isScanning: boolean;
  onStopScanning: () => void;
  scannerTargetRef: React.RefObject<HTMLDivElement>
}

const Scanner: React.FC<ScannerProps> = ({ isScanning, onStopScanning, scannerTargetRef }) => {
  return (
    <div className={classNames(css.Scanner, {
      [css['Scanner--hidden']]: !isScanning,
    })}>
      <div ref={scannerTargetRef} className={css.Scanner__target} />
      <Button
        variant="dark"
        onClick={onStopScanning}
        className={css.Scanner__target__cancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default Scanner;
