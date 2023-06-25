import {Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import { Receita } from '../model/receita';
import { CadastroStorageService } from './cadastro.storage.service';
import { ReceitaService } from '../services/receita.service';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [CadastroStorageService],
})
export class CadastroComponent implements OnInit {

  @ViewChild('form') form!: NgForm;

  receita!: Receita;
  receitas?: Receita[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private receitaService: CadastroStorageService) {}

    ngOnInit():  void {
    Shared.initializeWebStorage();
    this.receita = new Receita(" ");
    this.receitas = this.receitaService.getReceitas();
  }

    onSubmit(){
      this.isSubmitted = true;
      //if (!this.receitaService.isExist(this.receita.nome!)) {
        this.receitaService.save(this.receita);
    //  } else {
    //    this.receitaService.update(this.receita);
   //   }
      this.isShowMessage = true;
      this.isSuccess = true;
      this.message = 'Cadastro realizado com sucesso!';

      this.form.reset();
      this.receita = new Receita(" ");
      this.receitas = this.receitaService.getReceitas();
    }


    onEdit(receita: Receita) {
   //   let clone = Receita.clone(receita);
   //   this.receita = clone;
  }


  onDelete(nome: string) {
 //   let confirmation = window.confirm(
 //     'Você tem certeza que deseja remover ' + nome
 //   );
 //   if (!confirmation) {
 //     return;
    }

  //  let response: boolean = this.receitaService.delete(nome);
  //  this.isShowMessage = true;
  //  this.isSuccess = response;
  //  if (response) {
  //    this.message = 'O item foi removido com sucesso!';
  //  } else {
  //    this.message = 'Opps! O item não pode ser removido!';
  //  }
  //  this.receitas = this.receitaService.getReceitas();
    //this.receitaService.notifyTotalUsers();

  }
