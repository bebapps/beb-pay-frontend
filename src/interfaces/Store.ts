import Branding from './Branding';

interface Store {
  id: string;
  name: string;
  description: string;
  status: 'inactive' | 'active';
  logo: string | Blob;
  country: string | null;
  currency: string | null;
  url: string;
  branding: Branding;
}

export default Store;
