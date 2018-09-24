import {Component, OnInit, ViewChild} from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('signInForm') form: NgForm;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(new AuthActions.TrySignIn({username: email, password: password}));
  }

}
