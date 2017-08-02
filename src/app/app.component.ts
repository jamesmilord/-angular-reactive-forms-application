import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StateService } from './state.service';
import { FormDataService } from './form-data.service';
@Component({
  selector: 'my-app',
  template: `
    <div class="main">
      <h1>{{title}}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles:[`
    .main{
    text-align: center;
    }
  `],
  providers: [ StateService, FormDataService]
})
export class AppComponent implements OnInit {
  states: any[];
  title: String;
  constructor(private stateService: StateService) {
    this.title = "Customer onboarding"
   }

  getStates(): void {
    this.stateService.getStates().then(states => this.states = states);
  }

  ngOnInit(): void {
    this.getStates();
  }


}
