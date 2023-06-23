import { Component } from '@angular/core';

import { Country, Region } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  countries: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;

  constructor(private _countriesService: CountriesService) { }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;

    this._countriesService.searchRegion(region)
      .subscribe(contries => this.countries = contries);
  }

}
