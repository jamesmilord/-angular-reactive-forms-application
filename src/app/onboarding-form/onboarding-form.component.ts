import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MdDialog} from '@angular/material';

import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit{
  formSection:string;
  dataForm: FormGroup;
  start:number= 0;
  finish:number=5;
  control:any;
  formSections:any=['Authorized signer', 'Authorized Signer Details', 'Residential Address', 'Contact Details', 'PEP', 'ID'];
  formController:any=['signerCount', 'signerDetails', 'residential', 'contact','pep', 'document' ];
  titles=[
    {value: '1', viewValue: 'Mr'},
    {value: '2', viewValue: 'Mrs/ms'}
  ];
  genders:any= [
      'Male',
      'Female'
    ];
  responses:any=[
    'Yes',
    'No'
  ];
  documents=[
    {value:'1', type:'passport'},
    {value:'2', type:'Government issued ID'},
    {value:'3', type:'Drivers Licence'},
    {value:'4', type:'Company Id With Photo'}];

  constructor(private router: Router,
              private formDataService: FormDataService,
              public fb: FormBuilder,
              public dialog: MdDialog) {
    this.dataForm = fb.group({
      signerCount:fb.group({
        authorizedsigner: ['',[Validators.required, Validators.min(1)]],
        }),
      signerDetails:fb.group({
          title: ['',[Validators.required]],
          firstname:['',[Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
          middlename:['',[Validators.pattern('^[a-zA-Z ]*$')]],
          lastname:['',[Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
          Maidenname:['',[Validators.pattern('^[a-zA-Z]*$')]],
          socialsec:['',[Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9)]],
          citizenship: ['',[Validators.pattern('^[a-zA-Z ]*$')]],
          countryofbirth:['',[Validators.pattern('^[a-zA-Z ]*$')]],
          dateofbirth:'',
          gender: ''
        }),
      residential:fb.group({
          address:['',[Validators.required, Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]],
          city:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
          state:['',[Validators.pattern('^[a-zA-Z ]*$')]],
          country:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
          zipCode:['',[Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5)]]
      }),
      contact:fb.group({
          mainPhone:['',[Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
          cellPhone:'',
          businessEmail:['',[Validators.required, Validators.email]]
      }),
      pep:fb.group({
          pep:''
      }),
      document:fb.group({
          type:['',[Validators.required]],
          number:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
          dateIssued:['',[Validators.required]],
          expiration:['',[Validators.required]]
      })
    });
  }

  ngOnInit(){
    this.formSection = 'Authorized signer';
    this.control = 'signerCount';
  }

  onNext(){
      if(this.start < this.finish){
         this.formSection = this.formSections[this.start + 1];
         this.control = this.formController[this.start + 1];
         this.start++;
        }
  }

  isValid(){
    if(this.dataForm.controls[this.control].valid){
      return true;
    }
    return false
  }



  onComplete(){
  this.dialog.open(ModalDialogComponent, {'data':this.dataForm.value});
  }


}
