import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VmServiceModule } from 'core/iVM/-vm-service-module';
import { environment } from 'environments/environment';
import { MissingInfoFormComponent, ImageSrcNodeTypePipe } from './missing-info-form/missing-info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MissingInfoFormComponent,
    ImageSrcNodeTypePipe
  ],
  imports: [
    BrowserModule,
    VmServiceModule.forRoot(environment.apiUrl),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
