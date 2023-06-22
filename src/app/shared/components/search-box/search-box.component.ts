import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @Input() placeholder: string = 'Buscar';
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  private _debouncer$: Subject<string> = new Subject();
  private _subscription$?: Subscription;

  ngOnInit(): void {
    this._subscription$ = this._debouncer$
      .pipe(debounceTime(500))
      .subscribe(value => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this._subscription$?.unsubscribe();
  }

  onKeyPress(searchTerm: string): void {
    this._debouncer$.next(searchTerm);
  }

}
