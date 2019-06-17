import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VmServiceModule } from 'core/iVM/-vm-service-module';
import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VmServiceModule.forRoot(environment.apiUrl),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
