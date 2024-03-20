import countryCodes from '../data/countryCodes.json';
export const convertCountry = (iso) => {
    const country = countryCodes.find(country => country.code === iso);
    return country ? country.name : null;
}