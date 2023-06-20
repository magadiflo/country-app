import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly apiCountryUrl: string = environment.API_COUNTRY_URL;

  constructor(private _http: HttpClient) { }

  searchCapital(capital: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.apiCountryUrl}/capital/${capital}`)
      .pipe(
        catchError(err => of([]))
      );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.apiCountryUrl}/name/${country}`)
      .pipe(
        catchError(err => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]> {
    return this._http.get<Country[]>(`${this.apiCountryUrl}/region/${region}`)
      .pipe(
        catchError(err => of([]))
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this._http.get<Country[]>(`${this.apiCountryUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries[0]),
        catchError(err => of(null))
      );
  }

}
