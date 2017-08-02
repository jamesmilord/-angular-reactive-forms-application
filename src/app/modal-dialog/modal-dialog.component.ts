import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

import { OnboardingFormComponent } from '../onboarding-form/onboarding-form.component';



@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {
  form:any;




  constructor(public dialogRef: MdDialogRef<OnboardingFormComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
       this.form = data;




   }

  ngOnInit() {

  }

}
