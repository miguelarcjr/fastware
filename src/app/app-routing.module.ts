import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ClientesComponent } from './views/clientes/clientes.component';
import { DashboardLayoutComponent } from './views/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProdutosComponent } from './views/produtos/produtos.component';
import { TabelaComponent } from './views/tabela/tabela.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardLayoutComponent, children: [
    {path: '', redirectTo: 'produtos', pathMatch: 'full'},
    {path: 'tabela', component: TabelaComponent, canActivate: [AuthGuard]},
    {path: 'produtos', component: ProdutosComponent, canActivate: [AuthGuard]},
    {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
