import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

    onSearch(value: string) {
    this.search.emit(value);
  }

}
