import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as Mat from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HgbCommonPipesModule } from '@hgb/core';

import { VmServiceModule } from 'core/iVM/-vm-service-module';

import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageSrcNodeTypePipe, MissingInfoFormComponent } from './missing-info-form/missing-info-form.component';
import { MissingInfoPageComponent } from './missing-info-page/missing-info-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    ImageSrcNodeTypePipe,
    
    AppComponent,
    MissingInfoFormComponent,
    MissingInfoPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Mat.MatButtonModule,
    Mat.MatInputModule,
    Mat.MatCheckboxModule,

    HgbCommonPipesModule,
    VmServiceModule.forRoot(environment.apiUrl),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
