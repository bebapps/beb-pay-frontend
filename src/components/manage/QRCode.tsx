import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

interface QRCodeProps {
  size: number | `${number}%`;
  color: string;
  data: string;
  imageUrl: string;
}

const QRCode: React.FC<QRCodeProps> = ({ size, color, data, imageUrl }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling>();

  const getAdjustedSize = () => {
    if (typeof size === 'string') {
      const percentage = Number(size.match(/\d*/)![0]);
      const parentEl = elRef.current!.parentElement;
      return Math.min(parentEl!.clientHeight, parentEl!.clientWidth) * percentage / 100;
    } else {
      return size;
    }
  };

  const updateSize = () => {
    if (!elRef.current || !qrCodeRef.current) {
      return;
    }
    const adjustedSize = getAdjustedSize();

    qrCodeRef.current.update({
      width: adjustedSize,
      height: adjustedSize,
    });
  };

  useEffect(() => {
    const adjustedSize = getAdjustedSize();

    const qrCode = new QRCodeStyling({
      width: adjustedSize,
      height: adjustedSize,
      cornersDotOptions: {
        type: 'dot',
      },
      cornersSquareOptions: {
        type: 'dot',
      },
      data: data,
      image: imageUrl,
      dotsOptions: {
        color,
        type: 'square',
      },
      qrOptions: {
        errorCorrectionLevel: 'M',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 4,
      },
    });

    qrCodeRef.current = qrCode;

    elRef.current!.innerText = '';
    qrCode.append(elRef.current!);

    const resizeObserver = new ResizeObserver(updateSize);

    resizeObserver.observe(elRef.current!.parentElement!);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    updateSize();
  }, [size]);

  return (
    <div ref={elRef} />
  );
};

export default QRCode;
