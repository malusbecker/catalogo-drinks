import { Receita } from './../model/receita';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';

@Injectable()

export class CadastroStorageService {
  receitas!: Receita[];


    private receitaSource!: BehaviorSubject<number>;

  constructor() {
   this.receitas = WebStorageUtil.get(Constants.RECEITA_KEY);
   this.receitaSource = new BehaviorSubject<number>(1);
  }

  public save(receita: Receita){

    this.receitas = WebStorageUtil.get(Constants.RECEITA_KEY);
    this.receitas.push(receita);
    WebStorageUtil.set(Constants.RECEITA_KEY, this.receitas);

  }

  update(receita: Receita) {
    this.receitas = WebStorageUtil.get(Constants.RECEITA_KEY);
    this.delete(receita.nome!);
    this.save(receita);
  }

  delete(nome: string): boolean {
    this.receitas = WebStorageUtil.get(Constants.RECEITA_KEY);
    this.receitas = this.receitas.filter((u) => {
      return u.nome?.valueOf() != nome?.valueOf();
    });

    WebStorageUtil.set(Constants.RECEITA_KEY, this.receitas);
    return true;
  }


  //isExist(value: string): boolean {
   // this.receitas = WebStorageUtil.get(Constants.RECEITA_KEY);
   // for (let u of this.receitas) {
   //   if (u.nome?.valueOf() == value?.valueOf()) {
  //      return true;
  //    }
   // }
   // return false;
//  }

  getReceitas(): Receita[] {
    this.receitas = WebStorageUtil.get(Constants.RECEITA_KEY);
    return this.receitas;
  }

 // notifyTotalReceitas() {
  //  this.userSource.next(this.getUsers()?.length);
    // if (this.getUsers()?.length > 1) {
    //   this.userSource.complete();
    // }
 // }

  asObservable(): Observable<number> {
    return this.receitaSource;
   return this.receitaSource.asObservable()
 }
}


