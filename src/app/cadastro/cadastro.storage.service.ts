import { Receita } from './../model/receita';
import { Injectable } from '@angular/core';
import { CadastroObservableService } from './cadastro.observable-service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
providedIn: 'root',
})
export class CadastroStorageService {
  private receitas: Receita[] = [];
  private receita: Receita | undefined


  constructor(
  private localStorage: LocalStorageService,
  private receitaService: CadastroObservableService
  ){

    const storedReceitas = this.localStorage.retrieve('receitas');
    if (storedReceitas) {
      this.receitas = storedReceitas;
  }
  }

  ngOnInit(): void {
    this.getReceitas();
  }

  getReceita(id : string): void {
    this.receitaService.getById(id).subscribe({
      next: (receita) => {
        this.receita = receita;
        console.log('Receita localizada');
      },
      error: (error) => {
        this.receita = undefined;
        console.error('Erro ao buscar receita:', error);
      }
    });
  }

  getReceitas(): void {
    this.receitaService.getAll().subscribe({
      next: (receitas) => {
        this.receitas = receitas;
      },
      error: (error) => {
        console.error('Erro ao obter receita:', error);
      }
    });
  }

  salvarReceita(receita: Receita): void {
    this.receitaService.save(receita).subscribe({
      next: (novaReceita) => {
        console.log('Receita salva:', novaReceita);
        this.getReceitas();
      },
      error: (error) => {
        console.error('Erro ao salvar receita:', error);
      }
    });
  }

  atualizarReceita(receita: Receita): void {
    this.receitaService.update(receita).subscribe({
      next: (receitaAtualizada) => {
        console.log('Receita atualizada:', receitaAtualizada);
        this.getReceitas();
      },
      error: (error) => {
        console.error('Erro ao atualizar receita:', error);
      }
    });
  }

  removerReceita(id: string): void {
    this.receitaService.remove(id).subscribe({
      next: () => {
        console.log('Receita removida');
        this.getReceitas();
      },
      error: (error) => {
        console.error('Erro ao remover receita:', error);
      }
    });
  }

}


