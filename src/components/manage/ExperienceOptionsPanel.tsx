import css from './ExperienceOptionsPanel.module.scss';
import ColorPicker from '../inputs/ColorPicker';
import InputWrapper from '../inputs/InputWrapper';
import Slider from '../inputs/Slider';
import Toggle from '../inputs/Toggle';
import { ExperienceOptions } from '../manage/Experience';
import Panel from '../Panel';

interface ExperienceOptionsPanelProps {
  options: ExperienceOptions;
  setOptions: React.Dispatch<React.SetStateAction<ExperienceOptions>>;
}

const ExperienceOptionsPanel: React.FC<ExperienceOptionsPanelProps> = ({ options, setOptions }) => {
  const { primaryColor, iconStrokeWidth, borderRadius, boxShadowAlpha, animations } = options;

  const getSetOptionFunction = (name: string) => (value: unknown) =>
    setOptions(options => ({
      ...options,
      [name]: value, // TODO: also set variants when setting color
    }));

  return (
    <Panel className={css.ExperienceOptionsPanel}>
      <InputWrapper label="primary color">
        <ColorPicker
          value={primaryColor}
          onChange={
            getSetOptionFunction('primaryColor')
          }
        />
      </InputWrapper>
      <InputWrapper label="icon width">
        <Slider min={0.5}
          max={3}
          step={0.5}
          value={iconStrokeWidth}
          onChange={getSetOptionFunction('iconStrokeWidth')}
        />
      </InputWrapper>
      <InputWrapper label="border radius">
        <Slider min={0}
          max={5}
          step={1}
          value={borderRadius}
          onChange={getSetOptionFunction('borderRadius')}
        />
      </InputWrapper>
      <InputWrapper label="shadow">
        <Slider min={0}
          max={0.1}
          step={0.01}
          value={boxShadowAlpha}
          onChange={getSetOptionFunction('boxShadowAlpha')}
        />
      </InputWrapper>
      <InputWrapper label="animations">
        <Toggle value={animations}
          onChange={getSetOptionFunction('animations')}
        />
      </InputWrapper>
    </Panel>
  );
};

export default ExperienceOptionsPanel;
