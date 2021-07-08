import css from './ExperienceOptionsPanel.module.scss';
import ColorPicker from '../inputs/ColorPicker';
import InputWrapper from '../inputs/InputWrapper';
import Slider from '../inputs/Slider';
import Toggle from '../inputs/Toggle';
import Panel from '../Panel';
import Branding from '../../interfaces/Branding';

interface ExperienceOptionsPanelProps {
  branding: Branding;
  setBranding: (value: Branding) => void;
  onComplete: (value: Branding) => void;
}

const ExperienceOptionsPanel: React.FC<ExperienceOptionsPanelProps> = ({ branding, setBranding, onComplete }) => {
  const { primaryColor, iconStrokeWidth, borderRadius, boxShadowAlpha, animations } = branding;

  const getSetOptionFunction = (name: string) => (value: unknown) =>
    setBranding({
      ...branding,
      [name]: value,
    });

  return (
    <Panel className={css.ExperienceOptionsPanel}>
      <InputWrapper label="primary color">
        <ColorPicker
          value={primaryColor}
          onChange={getSetOptionFunction('primaryColor')}
          onBlur={() => onComplete(branding)}
        />
      </InputWrapper>
      <InputWrapper label="icon width">
        <Slider
          min={1}
          max={3}
          step={0.5}
          value={iconStrokeWidth}
          onChange={getSetOptionFunction('iconStrokeWidth')}
          onComplete={() => onComplete(branding)}
        />
      </InputWrapper>
      <InputWrapper label="border radius">
        <Slider min={0}
          max={5}
          step={1}
          value={borderRadius}
          onChange={getSetOptionFunction('borderRadius')}
          onComplete={() => onComplete(branding)}
        />
      </InputWrapper>
      <InputWrapper label="shadow">
        <Slider min={0}
          max={0.1}
          step={0.01}
          value={boxShadowAlpha}
          onChange={getSetOptionFunction('boxShadowAlpha')}
          onComplete={() => onComplete(branding)}
        />
      </InputWrapper>
      <InputWrapper label="animations">
        <Toggle
          value={animations}
          onChange={(value) => {
            const updatedBranding = { ...branding, animations: value };
            setBranding(updatedBranding);
            onComplete(updatedBranding);
          }}
        />
      </InputWrapper>
    </Panel>
  );
};

export default ExperienceOptionsPanel;
