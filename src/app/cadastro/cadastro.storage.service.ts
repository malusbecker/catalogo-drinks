import { Receita } from './../model/receita';
import { Injectable } from '@angular/core';
import { ReceitaPromiseService } from './receita.promise-service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
providedIn: 'root',
})
export class CadastroStorageService {
  private receitas: Receita[] = [];


  constructor(
  private localStorage: LocalStorageService,
  private receitaPromiseService: ReceitaPromiseService
  ){

    const storedReceitas = this.localStorage.retrieve('receitas');
    if (storedReceitas) {
      this.receitas = storedReceitas;
  }
  }

  getReceitas(): Receita[] {
    this.carregarReceitas();
    return this.receitas;
  }

  async getReceita(id: string): Promise<Receita | undefined> {
    return await this.receitaPromiseService.getById(id)
      .then((receita) => {
        return receita;
      })
      .catch((error) => {
        console.error('Erro ao obter receita da API:', error);
        throw error;
      });
  }

   adicionarReceita(receita: Receita): void {
    this.receitas.push(receita);
    this.atualizarReceitaLocal();


    this.receitaPromiseService.save(receita).catch((error) => {
      console.error('Erro ao adicionar receita na API:', error);
      const index = this.receitas.findIndex(r => r.id === receita.id);
      if (index !== -1) {
        this.receitas.splice(index, 1);
        this.atualizarReceitaLocal();
      }
    });
  }

  atualizarReceita(receita: Receita): void {
    const index = this.receitas.findIndex(r => r.id === receita.id);
    if (index !== -1) {
      this.receitas[index] = receita;
      this.atualizarReceitaLocal();
      this.receitaPromiseService.update(receita).catch((error) => {
        console.error('Erro ao atualizar paciente na API:', error);
        this.carregarReceitas();
            });
    }
  }

  removerReceita(id: string): void {
    const index = this.receitas.findIndex(r => r.id === id);
    if (index !== -1) {
      const receitaRemovida = this.receitas.splice(index, 1)[0];
      this.atualizarReceitaLocal();
      this.receitaPromiseService.remove(id)
        .catch((error) => {
          console.error('Erro ao remover paciente na API:', error);
          this.receitas.push(receitaRemovida);
          this.atualizarReceitaLocal();
        });
    }
  }

  private atualizarReceitaLocal(): void {
    this.localStorage.store('receitass', this.receitas);
  }

  private carregarReceitas(): void {
    this.receitaPromiseService.getAll().then((receitas) => {
      this.receitas = receitas;
      this.atualizarReceitaLocal();
    }).catch((error) => {
      console.error('Erro ao carregar receitas da API:', error);
    });
  }

  private clearLocalStorage(): void {
    this.localStorage.clear();
  }

}


