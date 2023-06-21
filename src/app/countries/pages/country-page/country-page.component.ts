import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;
  public bordersCountries: Country[] = [];

  public get existBordersCountries(): boolean {
    return (this.country?.borders || false) && this.bordersCountries.length === 0;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _countriesService: CountriesService) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe({
        next: country => {
          this.country = country!;
          console.log(this.country);

          if (this.country.borders) {
            const requets = this.country.borders.map(code => this._countriesService.searchCountryByAlphaCode(code));
            forkJoin(requets)
              .subscribe(bordersCountries => this.bordersCountries = bordersCountries);
          }

        },
        error: err => {
          console.log('error obtenido!', err);
          this._router.navigate(['/']);
        }
      });
  }

}
