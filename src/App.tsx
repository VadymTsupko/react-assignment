import WeatherForm from './components/WeatherForm';
import { ClothIconsEnum, Weather } from './types';
import { WeatherListener, WeatherManager } from './libs/WeatherListener';
import RecommendedClothCard from './components/RecommendedClothCard';
import Grid from '@mui/material/Unstable_Grid2';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import { observer } from 'mobx-react';
import { FC } from 'react';

const listener = new WeatherListener();

// @ts-ignore
window.listener = listener;

const weatherManager = new WeatherManager();

listener.updateWeather(weatherManager.weather);

const App: FC = () => {
  const handleWeatherChange = (weather: Weather) => {
    listener.updateWeather(weather);
  };

  return (
    <Grid
      container
      rowSpacing={{ xs: 2, sm: 4 }}
      columnSpacing={{ xs: 2, sm: 4 }}
      justifyContent="stretch">
      <Grid
        xs={12}
        sm={6}>
        <CurrentWeatherCard weather={listener.controller.weather} />
      </Grid>

      <Grid
        xs={12}
        sm={6}>
        <RecommendedClothCard>
          {listener.controller.wardrobeManager.cap && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Cap}</span>
          )}
          {listener.controller.wardrobeManager.coat && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Coat}</span>
          )}
          {listener.controller.wardrobeManager.umbrella && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Umbrella}</span>
          )}
          {listener.controller.wardrobeManager.scarf && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Scarf}</span>
          )}
          {listener.controller.wardrobeManager.shorts && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Short}</span>
          )}
          {listener.controller.wardrobeManager.pants && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Pants}</span>
          )}
          {listener.controller.wardrobeManager.sunglasses && (
            <span style={{ fontSize: '72px' }}>{ClothIconsEnum.Sunglasses}</span>
          )}
        </RecommendedClothCard>
      </Grid>

      {new URLSearchParams(window.location.search).has('admin') && (
        <Grid xs={12}>
          <div
            style={{
              backgroundColor: '#f1f1f1'
            }}>
            <WeatherForm onWeatherChanged={handleWeatherChange} />
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default observer(App);
