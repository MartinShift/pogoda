import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import WeatherForm from './app/components/WeatherForm';
import TypographyView from './app/components/TypographyView';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './app/features/themes';
import { isDaytime } from './app/features/isDaytime';
import  Favorites  from './app/components/Favorites';
import { getFavorites } from './app/features/getFavorites';

const App = () => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');
  const weather = useSelector((state) => state.weather.data);
  const [favorites, setFavorites] = useState(getFavorites());
  console.log(localStorage);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="2rem"
    >
      <Favorites favorites={favorites} setCity={setCity} setCountry={setCountry}>

      </Favorites>
      <WeatherForm city={city} country={country} setCity={setCity} setCountry={setCountry}>
      </WeatherForm>
      <ThemeProvider theme={isDaytime(weather) ? lightTheme : darkTheme}>
      <TypographyView setFavorites={setFavorites} favorites={favorites} weather={weather}>
      </TypographyView>
       </ThemeProvider>
    </Box>
   
  );
};

export default App;