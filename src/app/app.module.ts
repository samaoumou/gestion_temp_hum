
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ListArchivesComponent } from './list-archives/list-archives.component';
//import { ModifierComponent } from './modifier/modifier.component';
import { RouterModule } from '@angular/router';
//  import { ReactiveFormsModule } from '@angular/forms'
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfilComponent } from './profil/profil.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { ModifierPasswordComponent } from './modifier-password/modifier-password.component';
import { PageAdminComponent } from './page-admin/page-admin.component';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { PageUserComponent } from './page-user/page-user.component';
import { ListeAdministrateurComponent } from './liste-administrateur/liste-administrateur.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { DashbordComponent } from './dashbord/dashbord.component';
//import { DashbordOnComponent } from './dashbord-on/dashbord-on.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
/* import { HttpClient } from '@angular/common/http'; */











@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ListArchivesComponent,
   //// ModifierComponent,
    InscriptionComponent,
    ProfilComponent,
    ModifierProfilComponent,
    ModifierPasswordComponent,
    PageAdminComponent,
    ListeUserComponent,
    PageUserComponent,
    ListeAdministrateurComponent,
    DashbordComponent,
  //  DashbordOnComponent,
    PaginationComponent,
  
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
    
  
   
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }