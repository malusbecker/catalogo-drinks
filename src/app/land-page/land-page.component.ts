import { Component, OnInit } from '@angular/core';
import { Receita } from '../model/receita';
import { CadastroStorageService } from '../cadastro/cadastro.storage.service';


@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit{
  imageURL: string = 'assets/resources/images/drinks.png';

   receitas: Receita[] = [];

  constructor(private cadastroStorageService: CadastroStorageService) { }

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.receitas = this.cadastroStorageService.getReceitas();
  }

  performSearch(value: string) {
    console.log('Pesquisando por:', value);
  }
}
