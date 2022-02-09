import { NgModule } from '@angular/core/';
import { Routes, RouterModule } from '@angular/router';

//import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { ImportComponent } from './pictures/import/import.component';
import { DisplayComponent } from './pictures/display/display.component';
import { GenerateComponent } from './catalog/generate/generate.component';

//sécurité
import { ConnexionComponent } from './authentification/connexion/connexion.component';
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { LogoutComponent } from './authentification/logout/logout.component';
import { EmployeeComponent } from './authentification/model/job/employee/employee.component';
import { AddEmployeeComponent } from './authentification/model/job/add-employee/add-employee.component';
import { UserListComponent } from './authentification/model/user/user-list/user-list.component';
import { AuthGaurdService } from './authentification/service/auth-gaurd.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  /*
  {
    path: 'connexion',
    component: ConnexionComponent
  },
  */
  { path: 'catalog/generate', component: GenerateComponent },
  { path: 'pictures/import', component: ImportComponent, canActivate: [AuthGaurdService] },
  { path: 'pictures/display', component: DisplayComponent, canActivate: [AuthGaurdService] },

  //sécurité
  { path: 'viewemployees', component: EmployeeComponent, canActivate: [AuthGaurdService] },
  { path: 'addemployee', component: AddEmployeeComponent, canActivate: [AuthGaurdService] },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'users', component: UserListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
