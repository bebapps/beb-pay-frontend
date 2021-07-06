import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import css from './FileDropper.module.scss';

interface FileDropperProps {
  label: string;
  value?: Blob | string;
  onChange: (file?: File | null) => void;
}

const FileDropper: React.FC<FileDropperProps> = ({ label, value, onChange }) => {
  // use count to accommodate child elements
  const [dragEnterCount, setDragEnterCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLImageElement>(null);

  const incrementDragEnterCount = () => setDragEnterCount(count => count + 1);
  const decrementDragEnterCount = () => setDragEnterCount(count => count - 1);

  useEffect(() => {
    if (value instanceof Blob) {
      const valueSrc = URL.createObjectURL(value);
      valueRef.current!.src = valueSrc;

      return () => URL.revokeObjectURL(valueSrc);
    }

    if (value) {
      valueRef.current!.src = value;
    }
  }, [value]);

  return (
    <label
      className={classNames(css.FileDropper, {
        [css['FileDropper--hover']]: dragEnterCount, // :hover won't be triggered when dragging in a file
      })}
      onDragEnter={incrementDragEnterCount}
      onDragLeave={decrementDragEnterCount}
      onMouseEnter={incrementDragEnterCount}
      onMouseLeave={() => setDragEnterCount(0)}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        onChange(e.dataTransfer.items[0].getAsFile());
      }}
    >
      <input
        hidden
        type="file"
        onChange={e => onChange(e.target.files?.[0])}
        ref={fileInputRef}
      />
      <img
        className={classNames(css.FileDropper__image, {
          [css['FileDropper__image--hidden']]: !value,
        })}
        ref={valueRef}
      />
      {!value && (
        <>
          Drag and drop your {label},
          <br />
          or click to select
        </>
      )}
    </label>
  );
};

export default FileDropper;
