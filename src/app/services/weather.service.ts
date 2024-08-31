import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Weather} from "../Interfaces/weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  api: string = 'https://api.openweathermap.org/data/2.5/weather?appid=';
  key: string = 'b92eca54228f3f4400be21305c93ce65';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather>{
    const url: string = this.api + this.key + '&q=' + city;
    //console.log(url);
    return this.http.get<Weather>(url);
  }
}
