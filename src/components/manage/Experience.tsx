import ExperienceOptionsPanel from './ExperienceOptionsPanel';
import css from './Experience.module.scss';
import { useState } from 'react';
import Preview from './preview/Preview';

export interface ExperienceOptions {
  primaryColor: string;
  primaryHoverColor: string;
  iconStrokeWidth: number;
  borderRadius: number;
  boxShadowAlpha: number;
  animations: boolean;
}

const DEFAULT_EXPERIENCE_OPTIONS: ExperienceOptions = {
  primaryColor: '#562885',
  primaryHoverColor: '#633592',
  iconStrokeWidth: 2,
  borderRadius: 4,
  boxShadowAlpha: 0.05,
  animations: true,
};

const Experience: React.FC = () => {
  const [experienceOptions, setExperienceOptions] = useState<ExperienceOptions>(DEFAULT_EXPERIENCE_OPTIONS);

  return (
    <div className={css.Experience} >
      <ExperienceOptionsPanel
        options={experienceOptions as any}
        setOptions={setExperienceOptions as any}
      />
      <Preview {...experienceOptions}>
        Preview
      </Preview>
    </div>
  );
};

export default Experience;
