import { Component } from '@angular/core';
import { delayWhen, of, timer } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean = false;
  demo1TabIndex: any;
  /**
   * Variables for form validation for groups FormLoginValidateGroup and FormRegisterValidateGroup
   */
  ControlloginUsername = new FormControl('', Validators.required);
  ControlloginPassword = new FormControl('', Validators.required);
  ControlregisterName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  ControlregisterLastName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  ControlregisterUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  ControlregisterEmail = new FormControl('', [Validators.required, Validators.email]);
  ControlregisterDateBirth = new FormControl('', Validators.required);
  ControlregisterPhone = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9+]*$')]);
  ControlregisterGenero = new FormControl('', Validators.required);
  ControlregisterPassword = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,100}')]);
  ControlregisterPasswordValidate = new FormControl('', Validators.required);

  registerGenero: String = '';
  genero: any = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  constructor(private snackbar: SnackbarService) { }
  /**
   * Validates the Login group form
   */
  FormLoginValidateGroup = new FormGroup({
    username: this.ControlloginUsername,
    password: this.ControlloginPassword
  });
  /**
   * Validates the Register group form
   */
  FormRegisterValidateGroup = new FormGroup({
    name: this.ControlregisterName,
    lastname: this.ControlregisterLastName,
    user: this.ControlregisterUser,
    email: this.ControlregisterEmail,
    datebirth: this.ControlregisterDateBirth,
    phone: this.ControlregisterPhone,
    genero: this.ControlregisterGenero,
    password: this.ControlregisterPassword,
    passwordvalidate: this.ControlregisterPasswordValidate
  });
  /**
   * login: Simulates logging in after validating the Login form group
   */
  login() {
    this.loading = true;
    if (this.FormLoginValidateGroup.status == 'VALID') {
      of(null).pipe(
        delayWhen(() => timer(1000))
      ).subscribe(() => {
        //Returns a login data object
        console.log(this.FormLoginValidateGroup.value);
        this.clearFormLogin();
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.snackbar.warning('No cumple con las validaciones', 'ok');
    }
  }
  /**
   * register: Simulates registration after validation of the Register form group
   */
  register() {
    console.log(this.FormRegisterValidateGroup.value.password);
    const pass: any = this.FormRegisterValidateGroup.value.password;

    this.loading = true;
    if (pass == '') {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ required: true });
    } else if (!(/[!@#$%^&*_=+-]/).test(pass)) {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ especial: true });
    } else if (!(/(?=.*[0-9])/).test(pass)) {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ number: true });
    } else if (!(/(?=.*[a-z])/).test(pass)) {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ minus: true });
    } else if (!(/(?=.*[A-Z])/).test(pass)) {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ mayus: true });
    } else if (pass.length <= 8) {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ min: true });
    } else if (pass.length >= 100) {
      this.FormRegisterValidateGroup.get(['password'])?.setErrors({ max: true });
    }
    if (this.FormRegisterValidateGroup.status == 'VALID') {
      const passValidate: any = this.FormRegisterValidateGroup.value.passwordvalidate;
      if (pass == passValidate) {
        of(null).pipe(
          delayWhen(() => timer(1000))
        ).subscribe(() => {
          // Returns a register data object
          console.log(this.FormRegisterValidateGroup.value);
          this.clearFormRegister();
          this.snackbar.success('Usuario registrado', 'ok');
          this.loading = false;
          this.demo1TabIndex = 0;
        });
      } else {
        this.snackbar.error('Las claves no coinciden', 'ok');
        this.loading = false;
        this.ControlregisterPasswordValidate.setErrors({ noCoincide: true });
      }
    } else {
      this.snackbar.warning('No cumple con las validaciones', 'ok');
      this.loading = false;
    }
  }
  /**
   * clearFormLogin: clears the Login form
   */
  clearFormLogin() {
    this.FormLoginValidateGroup.reset();
    Object.keys(this.FormLoginValidateGroup.controls).forEach(key => {
      this.FormLoginValidateGroup.get(key)?.setErrors(null);
    });
  }
  /**
   * clearFormLogin: clears the Register form
   */
  clearFormRegister() {
    this.FormRegisterValidateGroup.reset();
    Object.keys(this.FormRegisterValidateGroup.controls).forEach(key => {
      this.FormRegisterValidateGroup.get(key)?.setErrors(null);
    });
  }
}