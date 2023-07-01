
import { Injectable } from '@angular/core';
import { RoutesAPI } from '../util/routes-api';
import { Receita } from '../model/receita';

@Injectable({
  providedIn: 'root',
})

export class ReceitaPromiseService {

  URL = 'http://localhost:3000/cadastro';
  URL_PT = 'http://localhost:3000/cadastro';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  constructor() {}

  async getAll(): Promise<Receita[]> {
    try {
      const response = await fetch(`${this.URL}`);
      if (!response.ok) {
        throw new Error('Erro ao obter receita da API');
      }
      const data = await response.json();
      return data as Receita[];
    } catch (error) {
      console.error('Ocorreu um erro ao obter receita da API:', error);
      throw error;
    }
  }
    async getById(id: String): Promise<Receita> {
      try {
        const response = await fetch(`${this.URL}/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao obter receita da API');
        }
        const data = await response.json();
        return data as Receita;
      } catch (error) {
        console.error('Erro ao obter receita da API:', error);
        throw error;
      }
    }

    async save(receita: Receita): Promise<Receita> {
      try {
        const response = await fetch(this.URL, {
          method: 'POST',
          headers: this.httpOptions.headers,
          body: JSON.stringify(receita)
        });
        if (!response.ok) {
          throw new Error('Erro ao salvar receita na API');
        }
        const data = await response.json();
        return data as Receita;
      } catch (error) {
        console.error('Erro ao salvar receita na API:', error);
        throw error;
      }
    }

    async patch(receita: Receita): Promise<Receita> {
      try {
        const response = await fetch(`${this.URL}/${receita.id}`, {
          method: 'PATCH',
          headers: this.httpOptions.headers,
          body: JSON.stringify(receita)
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar receita na API');
        }
        const data = await response.json();
        return data as Receita;
      } catch (error) {
        console.error('Erro ao atualizar receita na API:', error);
        throw error;
      }
    }

    async update(receita:Receita): Promise<Receita> {
      try {
        const response = await fetch(`${this.URL}/${receita.id}`, {
          method: 'PUT',
          headers: this.httpOptions.headers,
          body: JSON.stringify(receita)
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar receita na API');
        }
        const data = await response.json();
        return data as Receita;
      } catch (error) {
        console.error('Erro ao atualizar receita na API:', error);
        throw error;
      }
    }
    async remove(id: string): Promise<void> {
      try {
        const response = await fetch(`${this.URL}/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Erro ao remover receita na API');
        }
      } catch (error) {
        console.error('Erro ao remover receita na API:', error);
        throw error;
      }
    }

  }


