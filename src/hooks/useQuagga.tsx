import Quagga from '@ericblade/quagga2';
import { useRef, useState } from 'react';
import Barcode from '../interfaces/Barcode';

const startScanner = (target: HTMLDivElement) => {
  Quagga.init({
    frequency: 10,
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target,
      constraints: {
        width: target.clientWidth,
        height: target.clientHeight,
        facingMode: 'environment',
      },
    },
    decoder: {
      readers: [
        'code_128_reader',
        'ean_reader',
        'ean_8_reader',
        'code_39_reader',
        'code_39_vin_reader',
        'codabar_reader',
        'upc_reader',
        'upc_e_reader',
        'i2of5_reader',
      ],
    },

  }, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    Quagga.start();
  });
};

export const useQuagga = (onDetected: (result: Barcode) => void) => {
  const scannerTargetRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  Quagga.onDetected((result) => onDetected({ code: result.codeResult.code!, format: result.codeResult.format }));

  const startScanning = () => {
    if (!isScanning && scannerTargetRef.current) {
      startScanner(scannerTargetRef.current);
      setIsScanning(true);
    }
  };

  const stopScanning = () => {
    Quagga.stop();
    setIsScanning(false);
  };

  return { scannerTargetRef, isScanning, startScanning, stopScanning };
};
