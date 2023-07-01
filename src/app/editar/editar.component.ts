import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receita } from '../model/receita';
import { CadastroStorageService } from '../cadastro/cadastro.storage.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  receitas: Receita[] = [];
 revenue: Receita | undefined;
 receitaId: string | undefined;

  constructor(

    private route: ActivatedRoute,
    private router : Router,
    private cadastroStorageService: CadastroStorageService) { }

  async ngOnInit() {
    this.receitas = this.cadastroStorageService.getReceitas();
    const routeParams = this.route.snapshot.paramMap;
    const revenueIdFromRoute = routeParams.get('receitaId');

    if (revenueIdFromRoute !== null && revenueIdFromRoute !== undefined) {
      this.revenue = await this.cadastroStorageService.getReceita(revenueIdFromRoute);
    } else {
      console.error('O ID do paciente não foi fornecido.');
    }
  }

  async removerReceita(id: string): Promise<void> {
    await this.cadastroStorageService.removerReceita(id);
    this.router.navigate(['']);
  }
}
