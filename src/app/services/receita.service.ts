import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { ErrorUtil } from './../util/error-util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesAPI } from './../util/routes-api';
import { Receita } from './../model/receita';

@Injectable({
  providedIn: 'root',
})
export class ReceitaService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getByNome(nome: string): Observable<Receita[]> {
    const query: HttpParams = new HttpParams().set('nome', nome);
    const options = nome ? { params: query } : {};

    return this.httpClient.get<Receita[]>(`${RoutesAPI.CADASTRO}`, options).pipe(
      //map((receitas: Receita[])=>receitas[0]),
      catchError(ErrorUtil.handleError)
    );
  }


  save(receita: Receita): Observable<Receita> {
    return this.httpClient.post<Receita>(
      `${RoutesAPI.CADASTRO}`,
      receita,
      this.httpOptions
    );
  }

  patch(receita: Receita): Observable<Receita> {
    return this.httpClient.patch<Receita>(
      `${RoutesAPI.CADASTRO}/${receita.id}`,
      receita,
      this.httpOptions
    );
  }

  update(receita: Receita): Observable<Receita> {
   return this.httpClient.put<Receita>(
     `${RoutesAPI.CADASTRO}/${receita.id}`,
      receita,
      this.httpOptions
    );
 }
}
