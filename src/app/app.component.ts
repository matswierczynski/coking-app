import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import * as firebase from 'node_modules/firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cooking-app';
  loadedFeature = 'recipe';
  selectFeature(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain
    });
  }


}
