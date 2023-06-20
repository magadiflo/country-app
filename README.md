# CountryApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## routerLinkActiveOptions

Para agregar las clases solo cuando la URL coincida exactamente con el enlace, agregue la opción **exact: true**

```html
<a href="#" [routerLink]="['']" class="list-group-item list-group-item-action" routerLinkActive="active"
  [routerLinkActiveOptions]="{ exact: true }" aria-current="true">
  Home page
</a>
```

## Countries Service - RestContries

Para consultar los datos de los paises **[restcontries](https://restcountries.com/)**

