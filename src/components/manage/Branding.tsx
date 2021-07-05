import { useState } from 'react';
import FileDropper from '../inputs/FileDropper';
import InputWrapper from '../inputs/InputWrapper';
import TextField from '../inputs/TextField';
import Panel from '../Panel';
import css from './Branding.module.scss';

const Branding: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className={css.Branding}>
      <Panel className={css.Branding__panel}>

        <InputWrapper label="Name">
          <TextField
            value={name}
            onChange={setName}
          />
        </InputWrapper>

        <InputWrapper label="Description">
          <TextField
            type="textarea"
            value={description}
            onChange={setDescription}
          />
        </InputWrapper>

        <InputWrapper label="Logo">
          <FileDropper
            onChange={console.log}
            label="logo"
          />
        </InputWrapper>
      </Panel>
    </div>
  );
};

export default Branding;
