import { ExperienceOptions } from '../Experience';
import IPhone from './IPhone';
import css from './Preview.module.scss';

interface PreviewProps extends ExperienceOptions { }

const Preview: React.FC<PreviewProps> = ({ iconStrokeWidth, primaryColor, primaryHoverColor, borderRadius, boxShadowAlpha, children }) => (
  <div
    style={{
      '--color-primary': primaryColor,
      '--color-primary--hover': primaryHoverColor,
      '--icon-stroke-width': iconStrokeWidth,
      '--border-radius-xs': `${borderRadius / 2}px`,
      '--border-radius-s': `${borderRadius}px`,
      '--border-radius-m': `${borderRadius * 2}px`,
      '--border-radius-l': `${borderRadius * 3}px`,
      '--box-shadow-alpha': boxShadowAlpha,
    } as any}
    className={css.Preview}
  >
    <IPhone>
      {children}
    </IPhone>
  </div>
);

export default Preview;
