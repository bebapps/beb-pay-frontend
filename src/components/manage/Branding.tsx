import Store from '../../interfaces/Store';
import FileDropper from '../inputs/FileDropper';
import InputWrapper from '../inputs/InputWrapper';
import TextField from '../inputs/TextField';
import Panel from '../Panel';
import css from './Branding.module.scss';

interface BrandingProps {
  name: string;
  setName: (value: string) => void;
  logo: Store['logo'];
  setLogo: (value: Blob) => void;
  description: string;
  setDescription: (value: string) => void;
  onBlur: (key: keyof Store) => void;
}

const Branding: React.FC<BrandingProps> = ({ name, setName, description, setDescription, logo, setLogo, onBlur }) => {
  return (
    <div className={css.Branding}>
      <Panel className={css.Branding__panel}>

        <InputWrapper label="Name">
          <TextField
            value={name}
            onChange={setName}
            onBlur={() => onBlur('name')}
          />
        </InputWrapper>

        <InputWrapper label="Description">
          <TextField
            type="textarea"
            value={description}
            onChange={setDescription}
            onBlur={() => onBlur('description')}

          />
        </InputWrapper>

        <InputWrapper label="Logo">
          <FileDropper
            value={logo}
            onChange={(file?: File | null) => setLogo(file!)}
            label="logo"
          />
        </InputWrapper>

      </Panel>
    </div>
  );
};

export default Branding;
