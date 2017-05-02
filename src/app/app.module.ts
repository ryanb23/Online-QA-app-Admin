import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OfferDetailsComponent } from './offers/offer-details/offer-details.component';
import { OfferListComponent } from './offers/offer-list/offer-list.component';
import { CfieldDetailsComponent } from './cfields/cfield-details/cfield-details.component';
import { CfieldListComponent } from './cfields/cfield-list/cfield-list.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferDetailsComponent,
    OfferListComponent,
    CfieldDetailsComponent,
    CfieldListComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
