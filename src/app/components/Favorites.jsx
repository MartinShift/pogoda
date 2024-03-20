
import { Drawer, List, ListItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';
import { PropTypes } from 'prop-types';

const Favorites = ({setCountry, setCity, favorites }) => {
    const dispatch = useDispatch();
    return (<Drawer variant="permanent" anchor="left">
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
  )
}

Favorites.propTypes = {
    setCountry: PropTypes.func.isRequired,
    setCity: PropTypes.func.isRequired,
    favorites: PropTypes.array.isRequired
}

export default Favorites;