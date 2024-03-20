import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import PropTypes from 'prop-types';
import { isDaytime } from '../features/isDaytime';
import { IconButton, } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { convertCountry } from '../features/convertCountry';

const TypographyView = ({weather, favorites, setFavorites}) => {
  const toggleFavorite = () => {
    const favorite = { city: weather.name, country: convertCountry(weather.sys.country) };
    if (favorites.some(fav => fav.city === favorite.city && fav.country === favorite.country)) {
      setFavorites(favorites.filter(fav => fav.city !== favorite.city || fav.country !== favorite.country));
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(localStorage);
    } else {
      setFavorites([...favorites, favorite]);
    }
  };

    return(
        <>
        {weather && (
            <Card sx={{ 
              marginTop: 2, 
              width: 275, 
              backgroundImage: `url(${isDaytime(weather) ? '/images/sun.jpg' : '/images/moon.jpg'})`,
              backgroundSize: 'cover'
            }}>
               <CardContent>
               <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={toggleFavorite}>
                {favorites.includes(weather.name) ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Box>
                <Box display="flex" justifyContent="center">
                  <Avatar src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} sx={{ width: 56, height: 56 }} />
                </Box>
                <Typography variant="h5" component="div">
                  {weather.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Temperature: {weather.main.temp}°C
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Humidity: {weather.main.humidity}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          )
        }</>
        );
}


TypographyView.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    sys: PropTypes.shape({
      sunrise: PropTypes.number.isRequired,
      sunset: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TypographyView;