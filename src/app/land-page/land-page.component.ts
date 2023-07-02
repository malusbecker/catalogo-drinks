import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Receita } from '../model/receita';
import { Observable } from 'rxjs';
import { CadastroObservableService } from '../cadastro/cadastro.observable-service';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit{


  receitas$: Observable<Receita[]> | undefined;


  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private receitaObservable: CadastroObservableService) { }

  ngOnInit(): void {
    this.carregarReceitas();
  }


  carregarReceitas(): void {
    this.receitas$ = this.receitaObservable.getAll();
  }

  performSearch(value: string) {
    console.log('Buscando:', value);
  }


    onSearch(value: string) {
    this.search.emit(value);
  }

}

