import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestApiComponent } from './test-api/test-api.component';
import { HomeComponent } from './home/home.component';
//import { ConnexionComponent } from './connexion/connexion.component';
import { ImportComponent } from './pictures/import/import.component';
import { DisplayComponent } from './pictures/display/display.component';
import { ModelComponent } from './catalog/generate/model/model.component';
import { CustomizeComponent } from './catalog/generate/customize/customize.component';
import { GenerateComponent } from './catalog/generate/generate.component';

//rajout pour la sécurité
import { InscriptionComponent } from './authentification/inscription/inscription.component';
import { ConnexionComponent } from './authentification/connexion/connexion.component';
import { LogoutComponent } from './authentification/logout/logout.component';
import { EmployeeComponent } from './authentification/model/job/employee/employee.component';
import { AddEmployeeComponent } from './authentification/model/job/add-employee/add-employee.component';
import { UserListComponent } from './authentification/model/user/user-list/user-list.component';
import { HttpInterceptorService } from './authentification/service/http-interceptor.service';
import { UserService } from './authentification/service/user.service';


@NgModule({
  declarations: [
    AppComponent,
    TestApiComponent,
    ImportComponent,
    HomeComponent,
    //ConnexionComponent,
    DisplayComponent,
    ModelComponent,
    CustomizeComponent,
    GenerateComponent,
	
	//sécurité
	 InscriptionComponent,
    ConnexionComponent,
    LogoutComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    UserListComponent
	
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MDBBootstrapModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  
  //sécurité
  providers: [
    UserService,
    {  
      provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true 
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
