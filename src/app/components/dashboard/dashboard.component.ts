import { Component } from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgIf} from "@angular/common";
import {image1, image2, image3} from "../../../assets/imageData";

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
        this.weather = data.weather[0].main;
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

  protected readonly image1 = image1;
  protected readonly image2 = image2;
  protected readonly image3 = image3;
}
