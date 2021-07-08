import ExperienceOptionsPanel from './ExperienceOptionsPanel';
import css from './Experience.module.scss';
import Preview from './preview/Preview';
import Branding from '../../interfaces/Branding';
import StoreFront from '../store/StoreFront';

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
        branding={branding}
        setBranding={setBranding}
        onComplete={onComplete}
      />
      <Preview branding={branding}>
        <StoreFront
          storeId=""
          currency="USD"
          logoUrl={logoUrl}
        />
      </Preview>
    </div>
  );
};

export default Experience;
