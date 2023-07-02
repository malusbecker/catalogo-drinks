import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receita } from '../model/receita';
import { CadastroStorageService } from '../cadastro/cadastro.storage.service';
import { CadastroObservableService } from '../cadastro/cadastro.observable-service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

 receitas: Receita[] = [];
 receita!: Receita;
 receitaOrigem!: Receita;
 isEditar = false;

  constructor(

    private route: ActivatedRoute,
    private router : Router,
    private cadastroStorageService: CadastroStorageService,
    private cadastroObservable: CadastroObservableService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const receitaIdFromRoute = routeParams.get('receitaId');

    if (receitaIdFromRoute !== null && receitaIdFromRoute !== undefined) {
      this.buscarReceita(receitaIdFromRoute);
    } else {
      console.error('O ID da receita não foi fornecido.');
    }
  }

  buscarReceita(id: string): void {
    this.cadastroObservable.getById(id).subscribe({
      next: (receita) => {
        this.receita = receita;
        console.log('Receita localizada');
      },
      error: (error) => {
        console.error('Erro ao buscar receita:', error);
      }
    });
  }

  habilitarEdicao() {
    this.isEditar = true;
  }

  cancelarEdicao() {
    this.isEditar = false;
    this.receita = this.receitaOrigem;
  }

  onSubmit(): void {
    this.isEditar = false;
    this.cadastroStorageService.atualizarReceita(this.receita);
  }

  removerReceita(id: string): void {
    this.cadastroStorageService.removerReceita(id);
    this.router.navigate(['']);
  }
}
