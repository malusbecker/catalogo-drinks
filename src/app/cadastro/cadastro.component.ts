import { Component, OnInit} from '@angular/core';
import { Receita } from '../model/receita';
import { CadastroStorageService } from './cadastro.storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})

export class CadastroComponent implements OnInit {

  receita!: Receita;

  constructor(private cadastroStorageService: CadastroStorageService,

    private router : Router) { }

  ngOnInit(): void {
    this.receita = new Receita ('', '', '','');
  }

  adicionarReceita(receita: Receita): void {
    this.cadastroStorageService.salvarReceita(receita);
    this.router.navigate(['/editar', receita.id]);
  }

  onSubmit(): void {
    this.adicionarReceita(this.receita);
  }


}
