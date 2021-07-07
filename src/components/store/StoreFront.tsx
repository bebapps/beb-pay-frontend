import Header from './Header';
import ScanButton from './ScanButton';

interface StoreFrontProps {
  logoUrl: string;
}

const StoreFront: React.FC<StoreFrontProps> = ({ logoUrl }) => {
  return (
    <div>
      <Header logoUrl={logoUrl} />
      <ScanButton onClick={() => alert('scan time!')} />
    </div>
  );
};

export default StoreFront;
