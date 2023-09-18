import { NewSolicitComponent } from './components/new-solicit/new-solicit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './components/guard/auth-guard.service';

const routes: Routes = [
  {path:  '', component : LoginComponent},
  {path:  'home', component : HomeComponent , canActivate: [AuthGuardService]},
  {path:  'nova_solicitacao', component : NewSolicitComponent, canActivate: [AuthGuardService]},
  {path: 'nova_solicitacao/:id', component: NewSolicitComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
