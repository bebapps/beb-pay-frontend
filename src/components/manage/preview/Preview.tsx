import Branding from '../../../interfaces/Branding';
import BrandingStylesWrapper from '../../BrandingStylesWrapper';
import IPhone from './IPhone';
import css from './Preview.module.scss';

interface PreviewProps {
  branding: Branding;
}

const Preview: React.FC<PreviewProps> = ({ branding, children }) => (
  <BrandingStylesWrapper {...branding}>
    <div className={css.Preview} >
      <IPhone>
        {children}
      </IPhone>
    </div>
  </BrandingStylesWrapper>
);

export default Preview;
