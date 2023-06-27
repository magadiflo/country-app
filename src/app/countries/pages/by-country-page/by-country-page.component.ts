import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  countries: Country[] = [];
  initialValue: string = '';

  constructor(private _countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this._countriesService.cacheStore.byCountry.countries;
    this.initialValue = this._countriesService.cacheStore.byCountry.term;
  }

  searchByCountry(term: string): void {
    this._countriesService.searchCountry(term)
      .subscribe(countries => this.countries = countries);
  }

}
