import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import WeatherForm from './app/components/WeatherForm';
import TypographyView from './app/components/TypographyView';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './app/features/themes';
import { isDaytime } from './app/features/isDaytime';
import { Drawer, List, ListItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchWeather } from './app/features/weatherSlice';

const App = () => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
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
       <Drawer variant="permanent" anchor="left">
        <List>
          {favorites.map((favorite, index) => (
          <ListItem 
          button 
          key={index} 
          onClick={() => { 
            setCountry(favorite.country); 
            setCity(favorite.city); 
            dispatch(fetchWeather({ city: favorite.city, country: favorite.country })); 
          }}
        >
          {favorite.city}, {favorite.country}
        </ListItem>
          ))}
        </List>
      </Drawer>
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