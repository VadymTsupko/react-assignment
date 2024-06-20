import { action, makeObservable, observable } from 'mobx';
import { IWardrobeManager, SunnyWeatherPayload, Weather, WeatherType } from '../types';

export class WeatherManager {
  weather: Weather;
  wardrobeManager: IWardrobeManager;

  constructor() {
    makeObservable(this, {
      weather: observable,
      wardrobeManager: observable
    });

    const storedWeather = window.localStorage.getItem('weather');

    // debugger;
    this.weather = storedWeather
      ? JSON.parse(storedWeather)
      : {
          type: WeatherType.Clear,
          payload: { description: 'Clear sky', temperature: 20, humidity: 70 }
        };

    this.wardrobeManager = {
      sunglasses: false,
      cap: false,
      coat: false,
      umbrella: false,
      scarf: false,
      shorts: false,
      pants: false,

      putOnSunglasses(): void {
        this.sunglasses = true;
      },

      takeOffSunglasses(): void {
        this.sunglasses = false;
      },

      putOnCap(): void {
        this.cap = true;
      },

      takeOffCap(): void {
        this.cap = false;
      },

      putOnCoat(): void {
        this.coat = true;
      },

      takeOffCoat(): void {
        this.coat = false;
      },

      putOnScarf(): void {
        this.scarf = true;
      },

      takeOffScarf(): void {
        this.scarf = false;
      },

      putOnShorts(): void {
        this.shorts = true;
      },

      takeOffShorts(): void {
        this.shorts = false;
      },

      putOnPants(): void {
        this.pants = true;
      },

      takeOffPants(): void {
        this.pants = false;
      },

      takeUmbrella(): void {
        this.umbrella = true;
      },

      leaveUmbrella(): void {
        this.umbrella = false;
      }
    };
  }
}

export class WeatherListener {
  controller: WeatherManager = new WeatherManager();

  constructor() {
    makeObservable(this, {
      controller: observable,
      updateWeather: action
    });
  }

  public updateWeather(newWeather: Weather) {
    const currentWeather = this.controller.weather;
    const weatherChangeStatus = this.determineWeatherChangeStatus(currentWeather, newWeather);
    this.controller.weather = newWeather;

    window.localStorage.setItem('weather', JSON.stringify(newWeather));

    if (weatherChangeStatus.isWetWeather) {
      this.onWetWeather();
    }
    if (weatherChangeStatus.isSunnyWeather) {
      this.onSunnyWeather((newWeather.payload as SunnyWeatherPayload).temperature);
    }
    if (weatherChangeStatus.isStormyWeather) {
      this.onStormyWeather();
    }
    if (weatherChangeStatus.isSnowyWeather) {
      this.onSnowyWeather();
    }
    if (weatherChangeStatus.isWindyWeather) {
      this.onWindyWeather();
    }

    if (weatherChangeStatus.isWetWeatherStopped) {
      this.onWetWeatherStopped();
    }
    if (weatherChangeStatus.isSunnyWeatherStopped) {
      this.onSunnyWeatherStopped();
    }
    if (weatherChangeStatus.isStormyWeatherStopped) {
      this.onStormyWeatherStopped();
    }
    if (weatherChangeStatus.isSnowyWeatherStopped) {
      this.onSnowyWeatherStopped();
    }
    if (weatherChangeStatus.isWindyWeatherStopped) {
      this.onWindyWeatherStopped();
    }
  }

  private determineWeatherChangeStatus(from: Weather, to: Weather) {
    const wetTypes = [WeatherType.Rainy, WeatherType.Stormy];
    const isWetFrom = wetTypes.includes(from.type);
    const isWetTo = wetTypes.includes(to.type);
    const isWetWeather = isWetTo;
    const isWetWeatherStopped = isWetFrom && !isWetTo;

    const isSunnyWeather = to.type === WeatherType.Sunny;
    const isSunnyWeatherStopped = from.type === WeatherType.Sunny && to.type !== WeatherType.Sunny;

    const isStormyWeather = to.type === WeatherType.Stormy;
    const isStormyWeatherStopped =
      from.type === WeatherType.Stormy && to.type !== WeatherType.Stormy;

    const isSnowyWeather = to.type === WeatherType.Snowy;
    const isSnowyWeatherStopped = from.type === WeatherType.Snowy && to.type !== WeatherType.Snowy;

    const isWindyWeather = to.type === WeatherType.Windy;
    const isWindyWeatherStopped = from.type === WeatherType.Windy && to.type !== WeatherType.Windy;

    return {
      isWetWeather,
      isWetWeatherStopped,

      isSunnyWeather,
      isSunnyWeatherStopped,

      isStormyWeather,
      isStormyWeatherStopped,

      isSnowyWeather,
      isSnowyWeatherStopped,

      isWindyWeather,
      isWindyWeatherStopped
    };
  }

  private onWetWeather() {
    this.controller.wardrobeManager.takeUmbrella();

    if (!this.controller.wardrobeManager.pants && !this.controller.wardrobeManager.shorts) {
      this.controller.wardrobeManager.putOnPants();
    }
  }
  private onWetWeatherStopped() {
    this.controller.wardrobeManager.leaveUmbrella();
  }

  private onSunnyWeather(temperature: number) {
    this.controller.wardrobeManager.putOnSunglasses();

    if (temperature >= 25) {
      this.controller.wardrobeManager.putOnCap();
      this.controller.wardrobeManager.putOnShorts();
      this.controller.wardrobeManager.takeOffPants();
    } else {
      this.controller.wardrobeManager.putOnPants();
      this.controller.wardrobeManager.takeOffShorts();
      this.controller.wardrobeManager.takeOffCap();
    }
  }

  private onSunnyWeatherStopped() {
    this.controller.wardrobeManager.takeOffSunglasses();
    this.controller.wardrobeManager.takeOffCap();
  }

  private onStormyWeather() {
    this.controller.wardrobeManager.putOnPants();
    this.controller.wardrobeManager.takeOffShorts();
  }

  private onStormyWeatherStopped() {
    // this.controller.wardrobeManager.putOnPants();
  }
  private onSnowyWeather() {
    this.controller.wardrobeManager.putOnScarf();
    this.controller.wardrobeManager.putOnPants();
    this.controller.wardrobeManager.takeOffShorts();
  }
  private onSnowyWeatherStopped() {
    this.controller.wardrobeManager.takeOffScarf();
  }
  private onWindyWeather() {
    this.controller.wardrobeManager.putOnCoat();
    this.controller.wardrobeManager.putOnPants();
    this.controller.wardrobeManager.takeOffShorts();
  }
  private onWindyWeatherStopped() {
    this.controller.wardrobeManager.takeOffCoat();
  }
}
