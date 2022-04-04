import React from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Chip from '../../components/Chip';
import * as defaults from '../../constants/defaultValues';

const toF = (c: number) => (c * 9) / 5 + 32;

const query = gql`
  query ($latLong: WeatherQuery!) {
    getWeatherForLocation(latLong: $latLong) {
      description
      locationName
      temperatureinCelsius
    }
  }
`;

type WeatherData = {
  temperatureinCelsius: number;
  description: string;
  locationName: string;
};
type WeatherDataResponse = {
  getWeatherForLocation: WeatherData;
};

export default () => {
  const getLocation = useGeolocation();
  // Default to houston
  const latLong = {
    latitude: getLocation.latitude || defaults.HOUSTON_LATITUDE,
    longitude: getLocation.longitude || defaults.HOUSTON_LONGITUDE,
  };
  const { loading, error, data } = useQuery<WeatherDataResponse>(query, {
    variables: {
      latLong,
    },
  });

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Weather not found" />;
  const { locationName, description, temperatureinCelsius } = data.getWeatherForLocation;

  return <Chip label={`Weather in ${locationName}: ${description} and ${Math.round(toF(temperatureinCelsius))}°`} />;
};
