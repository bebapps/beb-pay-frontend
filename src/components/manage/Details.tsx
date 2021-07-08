import React, { useEffect, useState } from 'react';
import { useRequest } from '../../hooks/useRequest';
import NameValuePair from '../../interfaces/NameValuePair';
import Dropdown from '../inputs/Dropdown';
import InputWrapper from '../inputs/InputWrapper';
import Panel from '../Panel';
import css from './Details.module.scss';

interface DetailsProps {
  country: string;
  setCountry: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
}

const Details: React.FC<DetailsProps> = ({ country, setCountry, currency, setCurrency }) => {
  const [countries, setCountries] = useState<NameValuePair[]>([]);
  const [currencies, setCurrencies] = useState<NameValuePair[]>([]);
  const request = useRequest();

  const loadCountriesAndCurrencies = async () => {
    const result = await request('GET', '/api/stores/countries-and-currencies');
    setCountries(result.countries);
    setCurrencies(result.currencies);
  };

  useEffect(() => {
    loadCountriesAndCurrencies();
  }, []);

  return (
    <div className={css.Details}>
      <Panel className={css.Details__panel}>

        <InputWrapper label="Country">
          <Dropdown
            value={country}
            onSelect={setCountry}
            options={countries}
          />
        </InputWrapper>

        <InputWrapper label="Currency">
          <Dropdown
            value={currency}
            onSelect={setCurrency}
            options={currencies}
          />
        </InputWrapper>

      </Panel>
    </div>
  );
};

export default Details;
