import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$")]]
    }
    );
  }
  get registerFormControl() {
    return this.registerForm?.controls;
  }
  isValueExists(type:string) {
    let isInValid = true
    if(type ==='name' && this.registerFormControl?.name.value){
      const name = this.registerFormControl.name.value
      const UserList = ['Bob'];
      isInValid = UserList.includes(name)
      
    }
    else if(type ==='email' && this.registerFormControl?.email.value){
      const email = this.registerFormControl.email.value
      const emailList = ['example.com'];
      isInValid =  emailList.includes(email.toLocaleLowerCase())
      
    }
    return isInValid
  }
  checkIsFormInValid(){
      return (!this.registerForm?.valid || ((this.registerFormControl?.name?.value && this.isValueExists('name')) || (this.registerFormControl?.email?.value && this.isValueExists('email'))))
  } 

  onSubmit() {
    this.submitted = true;
    if (!this.checkIsFormInValid()) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }
}
