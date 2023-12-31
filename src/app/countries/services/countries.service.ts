import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

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

  constructor(private _http: HttpClient) {
    this._loadFromLocalStorage();
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this._getCountriesRequest(`${this.apiCountryUrl}/capital/${capital}`)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: capital, countries }),
        tap(() => this._saveLocalStorage())
      );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this._getCountriesRequest(`${this.apiCountryUrl}/name/${country}`)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term: country, countries }),
        tap(() => this._saveLocalStorage())
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this._getCountriesRequest(`${this.apiCountryUrl}/region/${region}`)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this._saveLocalStorage())
      );
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

  private _saveLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private _loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

}
