import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomFormValidators {

  emailPatternAndValueValidator(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } => {
      if (!formControl.value) {
        return null;
      }
      const regex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$");
      let valid = regex.test(formControl.value);
      const isInValid =  formControl.value.toLocaleLowerCase().indexOf('example.com') > -1;
      if(valid){
        return !isInValid ? null : { notValidEmail: true };
      }
      else{
        return valid ? null : { invalidEmail: true };
      }

    };
  }
  userNameValidator(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } => {
      const nameList = ['bob'];
      const valid =  nameList.includes(formControl.value.toLocaleLowerCase());
      return !valid ? null : { invalidUserName: true };

    };
  }
}