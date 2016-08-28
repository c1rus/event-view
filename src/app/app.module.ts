import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import './core/rxjs-extensions';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryStoreService } from '../api/in-memory-store.service';
import { routing } from './app.routing';
import { SpeakerService } from './models';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryStoreService, { delay: 600 }),
    LoginModule,
    routing,
    CoreModule,
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  providers: [SpeakerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
