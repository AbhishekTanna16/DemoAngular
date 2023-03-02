import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomFormValidators } from './custom-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  validatorForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private customFormValidator: CustomFormValidators
  ) {
    this.validatorForm = this.fb.group({
      name: ['', [Validators.compose([Validators.required,Validators.minLength(2), this.customFormValidator.userNameValidator()])]],
      email: ['', [Validators.compose([Validators.required, this.customFormValidator.emailPatternAndValueValidator()])]]
    }
    );
  }
  get validatorFormControl() {
    return this.validatorForm?.controls;
  }
  isValueExists(type:string) {
    let isInValid = true
    if(type ==='name' && this.validatorFormControl?.name.value){
      const name = this.validatorFormControl.name.value
      const UserList = ['Bob'];
      isInValid = UserList.includes(name)
      
    }
    else if(type ==='email' && this.validatorFormControl?.email.value){
      const email = this.validatorFormControl.email.value
      const emailList = ['example.com'];
      isInValid =  emailList.includes(email.toLocaleLowerCase())
      
    }
    return isInValid
  }
  checkIsFormInValid(){
      return (!this.validatorForm?.valid)
  } 

  onSubmit() {
    this.submitted = true;
    if (!this.checkIsFormInValid()) {
      alert('Form Submitted succesfully');
      console.table(this.validatorForm.value);
    }
  }
}
