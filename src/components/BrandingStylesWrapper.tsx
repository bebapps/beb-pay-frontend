import getColorShade from '../helpers/getColorShade';
import isColorLight from '../helpers/isColorLight';
import Branding from '../interfaces/Branding';

interface BrandingStylesWrapperProps extends Branding { };

const BrandingStylesWrapper: React.FC<BrandingStylesWrapperProps> = ({ primaryColor, iconStrokeWidth, borderRadius, boxShadowAlpha, children }) => (
  <div
    style={{
      '--color-primary': primaryColor,
      '--color-primary--hover': getColorShade(primaryColor, isColorLight(primaryColor) ? -20 : 20),
      '--color-primary--text': isColorLight(primaryColor) ? 'var(--color-text)' : '#ffffff',
      '--icon-stroke-width': `${iconStrokeWidth}px`,
      '--border-radius-xs': `${borderRadius / 2}px`,
      '--border-radius-s': `${borderRadius}px`,
      '--border-radius-m': `${borderRadius * 2}px`,
      '--border-radius-l': `${borderRadius * 3}px`,
      '--border-radius-xxl': `${borderRadius * 8}px`,
      '--box-shadow-alpha': boxShadowAlpha,
    } as any}
  >
    {children}
  </div>
);

export default BrandingStylesWrapper;
