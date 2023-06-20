import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _countriesService: CountriesService) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe(country => {
        if (!country) {
          this._router.navigate(['/']);
        }
        console.log(country);
      });
  }

}
