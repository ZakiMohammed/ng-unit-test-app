import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  mobile = '';
  message = '';
  error = false;

  regexMobile = /^([987]{1})(\d{1})(\d{8})$/;

  submit() {
    if (this.validate()) {
      this.mobile = '';
      this.message = 'Submitted successfully';
      this.error = false;
    }
  }

  reset() {
    this.mobile = '';
    this.message = '';
    this.error = false;
  }

  validate() {
    if (!this.mobile) {
      this.message = 'Please enter mobile number';
      this.error = true;
      return false;
    } else if (!this.regexMobile.test(this.mobile)) {
      this.message = 'Please provide a valid mobile number';
      this.error = true;
      return false;
    }

    return true;
  }

  cancel() {
    this.message = '';
    this.error = false;
  }
}
