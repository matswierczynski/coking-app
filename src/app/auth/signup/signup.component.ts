import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') form: NgForm;

  constructor() { }

  ngOnInit() {
  }

  onSignUp() {
    const email = this.form.value.email;
    const password = this.form.value.password;

  }

}
