import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') form: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignUp() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(new AuthActions.TrySignUp({username: email, password: password}));

  }

}
