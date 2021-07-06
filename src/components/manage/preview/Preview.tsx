import getColorShade from '../../../helpers/getColorShade';
import isColorLight from '../../../helpers/isColorLight';
import Branding from '../../../interfaces/Branding';
import IPhone from './IPhone';
import css from './Preview.module.scss';

interface PreviewProps extends Branding { }

const Preview: React.FC<PreviewProps> = ({ iconStrokeWidth, primaryColor, borderRadius, boxShadowAlpha, children }) => (
  <div
    style={{
      '--color-primary': primaryColor,
      '--color-primary--hover': getColorShade(primaryColor, isColorLight(primaryColor) ? -20 : 20),
      '--color-primary--text': isColorLight(primaryColor) ? 'var(--color-text)' : '#ffffff',
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
