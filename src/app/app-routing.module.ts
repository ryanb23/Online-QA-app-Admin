import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/AuthGuard';
import { AuthenticationService } from './_services/authentication.service';

import { LoginComponent } from './login/login.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { CfieldListComponent } from './cfields/cfield-list/cfield-list.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'offers', component: OfferListComponent, canActivate: [AuthGuard] },
    { path: 'cfields', component: CfieldListComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'offers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthenticationService
  ]
})
export class AppRoutingModule { }
