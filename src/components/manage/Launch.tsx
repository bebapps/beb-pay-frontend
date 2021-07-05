import { useState } from 'react';
import InputWrapper from '../inputs/InputWrapper';
import Toggle from '../inputs/Toggle';
import Panel from '../Panel';
import css from './Launch.module.scss';
import QRCode from './QRCode';

const Launch: React.FC = () => {
  const [storeCanBeAccessed, setStoreCanBeAccessed] = useState(true);

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
            value={storeCanBeAccessed}
            onChange={setStoreCanBeAccessed}
          />
        </InputWrapper>
      </Panel>
      <div className={css.Launch__qrCode}>
        <QRCode
          size="65%"
          color="#562885"
          data={`${window.location.origin}/${'storeID'}`} // TODO: provide store id
          imageUrl="" // TODO: provide store logo
        />
      </div>
    </div>
  );
};

export default Launch;
