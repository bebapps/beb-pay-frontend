import Branding from '../../../interfaces/Branding';
import BrandingStylesWrapper from '../../BrandingStylesWrapper';
import IPhone from './IPhone';
import css from './Preview.module.scss';

interface PreviewProps {
  branding: Branding;
}

const Preview: React.FC<PreviewProps> = ({ branding, children }) => (
  <div className={css.Preview} >
    <BrandingStylesWrapper {...branding}>
      <IPhone>
        {children}
      </IPhone>
    </BrandingStylesWrapper>
  </div>
);

export default Preview;
