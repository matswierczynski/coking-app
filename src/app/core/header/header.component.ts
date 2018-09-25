import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<fromApp.AppState>) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnInit() {
    this.authState = this.store.select('auth');
  }
}

