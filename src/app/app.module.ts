import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {shoppingListReducer} from './shopping-list/store/shopping-list.reducers';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ShoppingModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
