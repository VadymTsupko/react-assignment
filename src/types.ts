export enum WeatherType {
  Sunny = 'Sunny', // leave home, open windows
  Windy = 'Windy', // close windows
  Rainy = 'Rainy', // goHome
  Stormy = 'Stormy', // goHome, close windows
  Foggy = 'Foggy',
  Snowy = 'Snowy', // openWindows
  Clear = 'Clear' // leave home, open windows
}

export enum PrecipitationType {
  Rain = 'Rain',
  Snow = 'Snow',
  Sleet = 'Sleet'
}

export enum ClothIconsEnum {
  Cap = '🧢',
  Coat = '🧥',
  Pants = '👖',
  Scarf = '🧣',
  Short = '🩳',
  Sunglasses = '🕶️',
  Umbrella = '☂️'
}

export interface SunnyWeatherPayload {
  description: string;
  temperature: number; // in Celsius
  uvIndex: number; // UV index level
}

export interface WindyWeatherPayload {
  description: string;
  windSpeed: number; // in meters per second
  gustSpeed: number; // maximum gust speed
}

export interface RainyWeatherPayload {
  description: string;
  precipitationType: PrecipitationType.Rain;
  rainIntensity: number; // in millimeters per hour
}

export interface StormyWeatherPayload {
  description: string;
  precipitationType: PrecipitationType.Rain | PrecipitationType.Snow | PrecipitationType.Sleet;
  windSpeed: number; // in meters per second
  thunder: boolean; // presence of thunderstorms
}

export interface FoggyWeatherPayload {
  description: string;
  visibility: number; // in meters
  humidity: number; // percentage
}

export interface SnowyWeatherPayload {
  description: string;
  precipitationType: PrecipitationType.Snow;
  snowfallRate: number; // in centimeters per hour
  temperature: number; // in Celsius
}

export interface ClearWeatherPayload {
  description: string;
  temperature: number; // in Celsius
  humidity: number; // percentage
}

export type WeatherPayloadType =
  | SunnyWeatherPayload
  | WindyWeatherPayload
  | RainyWeatherPayload
  | StormyWeatherPayload
  | FoggyWeatherPayload
  | SnowyWeatherPayload
  | ClearWeatherPayload;

export interface Weather {
  type: WeatherType;
  payload: WeatherPayloadType;
}

export const WeatherIcons = {
  [WeatherType.Sunny]: '☀️',
  [WeatherType.Windy]: '🌬️',
  [WeatherType.Rainy]: '🌧️',
  [WeatherType.Stormy]: '🌩️',
  [WeatherType.Snowy]: '❄️',
  [WeatherType.Foggy]: '🌁',
  [WeatherType.Clear]: '🌞'
};

export interface IWardrobeManager {
  sunglasses: boolean;
  cap: boolean;
  coat: boolean;
  umbrella: boolean;
  scarf: boolean;
  shorts: boolean;
  pants: boolean;

  putOnSunglasses(): void;
  takeOffSunglasses(): void;

  putOnCap(): void;
  takeOffCap(): void;

  putOnCoat(): void;
  takeOffCoat(): void;

  putOnScarf(): void;
  takeOffScarf(): void;

  putOnShorts(): void;
  takeOffShorts(): void;

  putOnPants(): void;
  takeOffPants(): void;

  takeUmbrella(): void;
  leaveUmbrella(): void;
}
