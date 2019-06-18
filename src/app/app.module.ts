import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Mat from '@angular/material';

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
    BrowserAnimationsModule,
    Mat.MatInputModule,
    Mat.MatCheckboxModule,

    VmServiceModule.forRoot(environment.apiUrl),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
