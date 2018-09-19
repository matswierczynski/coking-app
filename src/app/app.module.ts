import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AppRoutingModule} from './app-routing.module';
import {RecipeDetailResolverService} from './recipies/recipe-detail/recipe-detail-resolver.service';
import {RecipeService} from './recipies/recipe.service';
import {DataStorageService} from './shared/data-storage.service';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {RecipesModule} from './recipies/recipes.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingModule} from './shopping-list/shopping.module';
import {AuthModule} from './auth/auth.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RecipesModule,
    SharedModule,
    ShoppingModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [ShoppingListService, RecipeDetailResolverService, RecipeService, DataStorageService,
  AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
