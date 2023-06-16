import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @Input() placeholder: string = 'Buscar';
  @Output() onValue: EventEmitter<string> = new EventEmitter();

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

}
