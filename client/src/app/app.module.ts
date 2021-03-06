
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap/';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppConfig } from './config/app-config';
import { AuthService, ContactService, JobService, LinkService } from './core';
import { AppRoutingModule } from './home/app-routes.module';
import { AdminModule } from './home/components/admin/admin.module';
import { JobModule } from './home/components/public/job/job.module';
import { PublicModule } from './home/components/public/public.module';
import { NavigationModule } from './shared/modules/navigation/navigation.module';
import { PopupsModule } from './shared/modules/popups/popups.module';
import { SharedModule } from './shared/modules/shared/shared.module';
import { MapService } from './shared/services/map/map.service';
// import { LoginComponent } from './shared/modules/popups/login/login.component';
// import { RegisterComponent } from './shared/modules/popups/register/register.component';
// import { ApplyJobComponent } from './shared/modules/popups/apply-job/apply-job.component';
// import { RegisterOrLoginComponent } from './shared/modules/popups/register-or-login/register-or-login.component';

export function  tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    JobModule,
    AdminModule,
    PublicModule,
    ToastrModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NgxTwitterTimelineModule,
    NavigationModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // apiKey: AppConfig.googleMapsKey
      apiKey: 'AIzaSyCGJqupv-L7oKpsfN5pNmH6cWernso96vI',
    }),
    NgbModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: [],
      },
    }),
    PopupsModule,
  ],
  providers: [
  AppConfig,
  AuthService,
  JobService,
  ContactService,
  LinkService,
  MapService,
],
  bootstrap: [AppComponent],
})
export class AppModule { }
