import ExperienceOptionsPanel from './ExperienceOptionsPanel';
import css from './Experience.module.scss';
import Preview from './preview/Preview';
import Branding from '../../interfaces/Branding';
import StoreFront from '../store/StoreFront';

const DEFAULT_BRANDING: Branding = {
  primaryColor: '#562885',
  iconStrokeWidth: 2,
  borderRadius: 4,
  boxShadowAlpha: 0.05,
  animations: true,
};

interface ExperienceProps {
  branding: Branding;
  logoUrl: string;
  setBranding: (value: Branding) => void;
  onComplete: (value: Branding) => void;
}

const Experience: React.FC<ExperienceProps> = ({ branding, logoUrl, setBranding, onComplete }) => {
  return (
    <div className={css.Experience} >
      <ExperienceOptionsPanel
        branding={{ ...DEFAULT_BRANDING, ...branding }}
        setBranding={setBranding}
        onComplete={onComplete}
      />
      <Preview branding={branding}>
        <StoreFront
          logoUrl={logoUrl}
        />
      </Preview>
    </div>
  );
};

export default Experience;
