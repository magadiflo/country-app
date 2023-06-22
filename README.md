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
---

## Countries Service - RestContries

Para consultar los datos de los paises **[restcontries](https://restcountries.com/)**

---

## Múltiples peticiones con RxJs

**CONTEXTO**
> Tengo un arreglo de códigos de países (fronteras de un país), lo que se quiere es hacer múltiples peticiones a un
> endpoint enviándole el código del país en cada petición y como respuesta obtener información detallada del país. 
> Entonces, queremos juntar todas las peticiones, y enviarlas, esperando a que todas se resuelvan para continuar.

Para resolver el problema, podemos usar la función de rxjs **forkJoin**:

- **forkJoin** es un operador que recibe un array de Observables o un diccionario de Observables como parámetro de entrada.
- **forkJoin** espera a que todos los Observables de entrada se completen, y entonces emite un array u objeto con la última emisión de cada uno de estos Observables.

**EJEMPLO**

Crea un array de observables que representen tus peticiones. Cada petición puede ser un observable de una llamada HTTP, por ejemplo. Asegúrate de importar el servicio necesario para realizar las peticiones:

```javascript
import { HttpClient } from '@angular/common/http';

// ...

constructor(private http: HttpClient) {}

// ...

const request1$ = this.http.get('url1');
const request2$ = this.http.get('url2');
const request3$ = this.http.get('url3');

const requests = [request1$, request2$, request3$];
```
Utiliza la función **forkJoin** para combinar los observables y esperar a que todos se resuelvan. Puedes suscribirte al resultado y manejarlo como desees:

```javascript
forkJoin(requests).subscribe((results) => {
  // Aquí puedes manejar el resultado de todas las peticiones
  console.log(results[0]); // Resultado de la primera petición
  console.log(results[1]); // Resultado de la segunda petición
  console.log(results[2]); // Resultado de la tercera petición
}, (error) => {
  // Manejo de errores
});
```

En este ejemplo, forkJoin combina los observables request1$, request2$ y request3$, y espera a que todos se completen. Una vez que se completen todas las peticiones, se emitirá un array con los resultados en el mismo orden en el que se pasaron los observables.

Si alguna de las peticiones falla, el observable resultante de forkJoin emitirá un error y se ejecutará el bloque de manejo de errores.

--- 
## Operador delay(...)

Retrasa la emisión de elementos de la fuente Observable por un tiempo de espera determinado o hasta una Fecha determinada.
El tiempo cambia cada elemento en una cantidad específica de milisegundos.
