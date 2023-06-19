import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { LandPageComponent } from './land-page/land-page.component';


const routes: Routes = [
  { path: 'inicio', component: LandPageComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
