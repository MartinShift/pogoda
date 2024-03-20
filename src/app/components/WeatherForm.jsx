import countries from "../data/countries";
import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { fetchWeather } from '../features/weatherSlice';
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const WeatherForm = ({ country, city, setCity, setCountry }) => {

    const dispatch = useDispatch();

    const getWeather = (e) => {
        e.preventDefault();
        dispatch(fetchWeather({ city, country }));
      };

    return (  <form onSubmit={getWeather}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Autocomplete
            options={Object.keys(countries)}
            value={country}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => setCountry(newValue)}
            renderInput={(params) => <TextField {...params} label="Country" sx={{ width: 200 }} />}
          />
          {country && (
            <Autocomplete
              options={countries[country]}
              value={city}
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => setCity(newValue)}
              renderInput={(params) => <TextField {...params} label="City" sx={{ width: 200 }} />}
            />
          )}
          <Button type="submit">Get Weather</Button>
        </Box>
      </form>
      );
}

WeatherForm.propTypes = {
    country: PropTypes.string,
    city: PropTypes.string,
    setCity: PropTypes.func,
    setCountry: PropTypes.func
};


export default WeatherForm;