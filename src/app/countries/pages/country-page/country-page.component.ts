import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin, switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit, OnDestroy {

  public country?: Country;
  public bordersCountries: Country[] = [];
  private _subscription$: Subscription = new Subscription();

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
            this._subscription$ = forkJoin(requets)
              .subscribe(bordersCountries => this.bordersCountries = bordersCountries);
          }

        },
        error: err => {
          console.log('error obtenido!', err);
          this._router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this._subscription$.unsubscribe();
  }

}
