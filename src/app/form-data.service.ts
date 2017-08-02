import { Injectable } from '@angular/core';

@Injectable()
export class FormDataService {
  data:any;

  constructor() { }

  formData(): Promise<any[]> {
  return Promise.resolve(this.data);
}

extractFormData(data){

}

setData(key, data:any){
  if(typeof data != 'object'){
    this.data[0][key]=data;
  }else {
    console.log(data);
    for(let i = 0; i < Object.keys(data).length; i++){
      this.data[0].signerDetails[Object.keys(data)[i]] = data[Object.keys(data)[i]];
   }
  }
}
}
