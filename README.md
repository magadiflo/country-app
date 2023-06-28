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
[routerLinkActiveOptions]="{exact: true}", debemos agregarle esta opción ya que 
inicialmente definimos en el app-routing.module.ts, a la ruta '' como pathMatch: full, es por eso que siempre
se muestra seleccionada, a pesar de que se cambia de ruta. Y esto es, como se escribió en el
el comentario de app-routing.module.ts (===> full) porque la ruta vacía ('') es prefijo
de cualquier URL.

Agregándole esta opción, le decimos que la ruta debe ser exactamente igual a la ruta '' para que use el routerLinkActive

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

---

## Limpieza de suscripciones

Cuando creemos un **Subject, BehaviorSubject, etc...** donde nosotros mismos construimos el observable de manera manual y en donde nosotros
realizamos un **subscribe**, es necesario, al destruir el componente, hacer un **unsubscribe()** de dicho subject, para evitar fuga de memoria, es decir, a pesar de que el componente ya no exista, la subscripción de dichos elementos seguirá existiendo, por lo que es necesario hacer el **unsubscribe()**.

Existen unas excepciones, cuando usamos los métodos **get(...), post(...), put(...), delete(...), etc** del **HttpClient**, o cuando usamos el **ActivatedRoute** para recibir un parámetro por url, allí **nosotros no necesitamos hacer dicha limpieza**. Angular mismo se encargará de limpiarlo cuando el componente se destruya.

**NOTA**
> Este tema se habla en la **Sección 10: Mejoras y funcionalidades extra, clase 135. Limpieza de subscripciones**.

## pathMatch: 'full'
Cuando trabajamos con los **Routes** definiendo las rutas de la aplicación, a menudo se usa el **pathMatch: 'full'** cuando el **path: ''**, pero ¿Qué es el pathMatch: 'full'?

**El pathMatch**, es una estrategia que determina si una url pertenece o no a una ruta.  
El atributo pathMatch, puede tomar 2 valores: **full o prefix**:

- **full**, debe coincidir la ruta completa con la URL completa. **Se aplica
       a la ruta vacía**, ya que la misma es un prefijo de cualquier URL y
       puede provocar un bucle sin fin.
- **prefix** (por defecto), significa que se elige la primera ruta donde la
       ruta coincide con el inicio de la URL, pero luego el algoritmo de
       coincidencia de ruta continúa buscando rutas secundarias coincidentes
       donde coincide el resto de la URL.

Con el **pathMatch 'full'** estamos indicándole a angular que solo entre a esa ruta si el path
es exactamente ese, ni más ni menos. Si no es exactamente ese, no entra. ¿Por qué esto?
Bueno, el comportamiento por defecto es pathMach: 'prefix', que este básicamente
busca de izquierda a derecha, y cuando la ruta haga match con el path (aunque pueda no ser la ruta completa) entrará.
También ten en cuenta cómo declaramos las rutas, y que estas se leen de arriba hacia abajo.
Si tienes una ruta que siempre se cumpla sin el pathMatch: 'full', aunque abajo de esta
tengas otra ruta declarada con un path más específico, no entrará a esa, porque en la primera que entra se queda, no busca más.
De ahí que o uses pathMatch: 'full', o declares las rutas de la más específica a la menos.
