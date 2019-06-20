import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppResolveKeys } from './-common/-resolve-keys';
import { Resolver_MissingInfoVM } from './missing-info-page/resolver-missing-info-vm';
import { MissingInfoPageComponent } from './missing-info-page/missing-info-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: MissingInfoPageComponent,
    resolve: <AppResolveKeys> {
      missingInfoVM: Resolver_MissingInfoVM,
    }
  },
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    
  })],
  exports: [RouterModule],
  providers: [
    Resolver_MissingInfoVM
  ]
})
export class AppRoutingModule {}