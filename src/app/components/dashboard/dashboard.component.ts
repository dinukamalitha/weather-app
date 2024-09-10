import { Component } from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgIf} from "@angular/common";
import {
  brokenClouds,
  clearSky, drizzle,
  fewClouds, fog, haze, heavyRain,
  image1,
  image2, lightRain, mist, moderateRain,
  overcastClouds,
  scatteredClouds, snow, thunderstorm
} from "../../../assets/imageData";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, DecimalPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  city: string = '';
  temperature: number = 0;
  humidity: number = 0;
  weather: string = '';
  windSpeed: number = 0;
  pressure: number = 0;
  query: boolean = false;
  error: boolean = false;

  constructor(private weatherService: WeatherService) {

  }

  getWeatherData() {
    // console.log(this.city);
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        console.log(data);
        this.query = true;
        this.temperature = data.main.temp - 272;
        this.humidity = data.main.humidity;
        this.weather = data.weather[0].description;
        this.windSpeed = data.wind.speed * 3.6;
        this.pressure = data.main.pressure;
      },
      error: (err) => {
        console.log(err)
        this.error = true;
        this.city = ''

        setTimeout(()=>{
          this.error = false;
        },3000)
      }
    });
  }

  loadWeatherImage(): string {
    let weatherImage: string = '';
    const description = this.weather.toLowerCase();

    switch (description) {
      case 'clear sky':
        weatherImage = this.clearSky;
        break;
      case 'few clouds':
        weatherImage = this.fewClouds;
        break;
      case 'scattered clouds':
        weatherImage = this.scatteredClouds;
        break;
      case 'broken clouds':
        weatherImage = this.brokenClouds;
        break;
      case 'overcast clouds':
        weatherImage = this.overcastClouds;
        break;
      case 'light rain':
        weatherImage = this.lightRain;
        break;
      case 'moderate rain':
        weatherImage = this.moderateRain;
        break;
      case 'heavy rain':
        weatherImage = this.heavyRain;
        break;
      case 'drizzle':
        weatherImage = this.drizzle;
        break;
      case 'snow':
        weatherImage = this.snow;
        break;
      case 'thunderstorm':
        weatherImage = this.thunderstorm;
        break;
      case 'mist':
        weatherImage = this.mist;
        break;
      case 'fog':
        weatherImage = this.fog;
        break;
      case 'haze':
        weatherImage = this.haze;
        break;
      default:
        weatherImage = this.image2;
    }

    return weatherImage;
  }


  clearWeatherData(){
    this.query = false;
    this.city = '';
    this.temperature = 0;
    this.humidity = 0;
    this.weather = '';
    this.windSpeed = 0;
    this.pressure = 0;
  }

  protected readonly image1 = image1;
  protected readonly image2 = image2;
  protected readonly clearSky = clearSky;
  protected readonly fewClouds = fewClouds;
  protected readonly scatteredClouds = scatteredClouds;
  protected readonly brokenClouds = brokenClouds;
  protected readonly overcastClouds = overcastClouds;
  protected readonly lightRain = lightRain;
  protected readonly moderateRain = moderateRain;
  protected readonly heavyRain = heavyRain;
  protected readonly snow = snow;
  protected readonly drizzle = drizzle;
  protected readonly thunderstorm = thunderstorm;
  protected readonly mist = mist;
  protected readonly fog = fog;
  protected readonly haze = haze;
 }
