import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() placeholder: string = 'Buscar';
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  private _debouncer: Subject<string> = new Subject();

  ngOnInit(): void {
    this._debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  onKeyPress(searchTerm: string): void {
    this._debouncer.next(searchTerm);
  }

}
