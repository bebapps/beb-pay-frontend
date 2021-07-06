import ExperienceOptionsPanel from './ExperienceOptionsPanel';
import css from './Experience.module.scss';
import Preview from './preview/Preview';
import Example from '../Example';
import Branding from '../../interfaces/Branding';

const DEFAULT_BRANDING: Branding = {
  primaryColor: '#562885',
  iconStrokeWidth: 2,
  borderRadius: 4,
  boxShadowAlpha: 0.05,
  animations: true,
};

interface ExperienceProps {
  branding: Branding;
  setBranding: (value: Branding) => void;
  onComplete: (value: Branding) => void;
}

const Experience: React.FC<ExperienceProps> = ({ branding, setBranding, onComplete }) => {
  return (
    <div className={css.Experience} >
      <ExperienceOptionsPanel
        branding={{ ...DEFAULT_BRANDING, ...branding }}
        setBranding={setBranding}
        onComplete={onComplete}
      />
      <Preview {...branding}>
        <Example />
      </Preview>
    </div>
  );
};

export default Experience;
