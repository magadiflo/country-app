import { Component } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  countries: Country[] = [];

  constructor(private _countriesService: CountriesService) { }

  searchByRegion(term: string): void {
    this._countriesService.searchRegion(term)
      .subscribe(contries => this.countries = contries);
  }

}
