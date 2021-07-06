interface Store {
  id: string;
  name: string;
  description: string;
  status: 'inactive' | 'active';
  logo: string | Blob;
  country: string | null;
  currency: string | null;
  branding: {
    [key: string]: string | number | boolean;
  };
}

export default Store;
