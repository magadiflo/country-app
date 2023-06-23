import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CacheStore, Country, Region } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: undefined, countries: [] }
  }

  private readonly apiCountryUrl: string = environment.API_COUNTRY_URL;

  constructor(private _http: HttpClient) { }

  searchCapital(capital: string): Observable<Country[]> {
    return this._getCountriesRequest(`${this.apiCountryUrl}/capital/${capital}`);
  }

  searchCountry(country: string): Observable<Country[]> {
    return this._getCountriesRequest(`${this.apiCountryUrl}/name/${country}`);
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this._getCountriesRequest(`${this.apiCountryUrl}/region/${region}`);
  }

  searchCountryByAlphaCode(code: string): Observable<Country> {
    return this._http.get<Country[]>(`${this.apiCountryUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries[0])
      );
  }

  private _getCountriesRequest(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url)
      .pipe(
        catchError(err => of([])),
        //delay(2000),// para observar el loading que implementaremos
      );
  }

}
