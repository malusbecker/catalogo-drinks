import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Receita } from '../model/receita';


@Injectable({
  providedIn: 'root'
})
export class CadastroObservableService {
  URL = 'http://localhost:3000/cadastro';
  URL_PT = 'http://localhost:3000/cadastro';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.URL_PT).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  getById(id: string): Observable<Receita> {
    return this.http.get<Receita>(`${this.URL_PT}/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  save(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(this.URL, receita, this.httpOptions).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  patch(receita: Receita): Observable<Receita> {
    return this.http.patch<Receita>(`${this.URL}/${receita.id}`, receita, this.httpOptions).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  update(receita: Receita): Observable<Receita> {
    return this.http.put<Receita>(`${this.URL}/${receita.id}`, receita, this.httpOptions).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_PT}/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(`Código do erro: ${error.status}, ` + `mensagem: ${error.error}`);
    }
    return throwError(() => new Error('Erro na requisição. Tente novamente'));
  }

}
