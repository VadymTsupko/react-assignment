import React from 'react';
import WeatherCard from './WeatherCard';
import { Weather, WeatherType, PrecipitationType, WeatherPayloadType } from '../types';
import { observer } from 'mobx-react';

const weatherList: Weather[] = [
  { type: WeatherType.Sunny, payload: { description: '', temperature: 0, uvIndex: 0 } },
  { type: WeatherType.Windy, payload: { description: '', windSpeed: 0, gustSpeed: 0 } },
  {
    type: WeatherType.Rainy,
    payload: { description: '', precipitationType: PrecipitationType.Rain, rainIntensity: 0 }
  },
  {
    type: WeatherType.Stormy,
    payload: {
      description: '',
      precipitationType: PrecipitationType.Rain,
      windSpeed: 0,
      thunder: false
    }
  },
  { type: WeatherType.Foggy, payload: { description: '', visibility: 0, humidity: 0 } },
  {
    type: WeatherType.Snowy,
    payload: {
      description: '',
      precipitationType: PrecipitationType.Snow,
      snowfallRate: 0,
      temperature: 0
    }
  },
  { type: WeatherType.Clear, payload: { description: '', temperature: 0, humidity: 0 } }
];

const WeatherForm: React.FC<{ onWeatherChanged: (weather: Weather) => void }> = ({
  onWeatherChanged
}: {
  onWeatherChanged: (weather: Weather) => void;
}) => {
  const [selectedWeather, setSelectedWeather] = React.useState<WeatherType | null>(null);
  const [list, setList] = React.useState<Weather[]>(weatherList);

  const updateWeatherItem = (index: number, newData: Partial<Weather>): void => {
    setList(prevWeatherList => {
      const updatedWeatherList = [...prevWeatherList];
      updatedWeatherList[index] = {
        ...updatedWeatherList[index],
        payload: {
          ...(updatedWeatherList[index].payload as WeatherPayloadType),
          ...newData.payload
        }
      };
      return updatedWeatherList;
    });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '325px',
        display: 'inline-block',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        padding: '10px 0'
      }}>
      {list.map((weather, index) => (
        <WeatherCard
          key={index}
          weather={weather}
          onClick={() => {
            onWeatherChanged(weather);
            setSelectedWeather(weather.type || null);
            if (weather.type === WeatherType.Clear || weather.type === WeatherType.Foggy) {
              alert('no outfit provided for this weather type');
            }
          }}
          onChange={updatedWeather => {
            onWeatherChanged(updatedWeather);
            updateWeatherItem(index, updatedWeather);
          }}
          isSelected={selectedWeather === weather.type}
        />
      ))}
    </div>
  );
};
export default observer(WeatherForm);
