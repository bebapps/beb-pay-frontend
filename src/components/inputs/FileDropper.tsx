import classNames from 'classnames';
import { useRef, useState } from 'react';
import css from './FileDropper.module.scss';

interface FileDropperProps {
  label: string;
  onChange: (file?: File | null) => void;
}

const FileDropper: React.FC<FileDropperProps> = ({ label, onChange }) => {
  // use count to accommodate child elements
  const [dragEnterCount, setDragEnterCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const incrementDragEnterCount = () => setDragEnterCount(count => count + 1);
  const decrementDragEnterCount = () => setDragEnterCount(count => count - 1);

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
      Drag and drop your {label},
      <br />
      or click to select
    </label>
  );
};

export default FileDropper;
