import Store from '../../interfaces/Store';
import InputWrapper from '../inputs/InputWrapper';
import Toggle from '../inputs/Toggle';
import Panel from '../Panel';
import css from './Launch.module.scss';
import QRCode from './QRCode';

interface LaunchProps {
  url: string;
  logoUrl: string;
  color: string;
  status: Store['status'];
  setStatus: (value: Store['status']) => void;
}

const Launch: React.FC<LaunchProps> = ({ url, logoUrl, color, status, setStatus }) => {
  return (
    <div className={css.Launch}>
      <Panel className={css.Launch__panel}>
        <p>
          Once live, customers will be able to use your <strong>Beb Pay</strong> store for making purchases.
        </p>
        <p>
          Save the QR code to the right, print it out, and put it near the entrance of your store.
        </p>
        <br />
        <InputWrapper label="Store can be accessed">
          <Toggle
            value={status === 'active'}
            onChange={() => setStatus(status === 'active' ? 'inactive' : 'active')}
          />
        </InputWrapper>
      </Panel>
      <div className={css.Launch__qrCode}>
        <QRCode
          size="65%"
          color={color}
          data={url}
          imageUrl={logoUrl}
        />
      </div>
    </div>
  );
};

export default Launch;
