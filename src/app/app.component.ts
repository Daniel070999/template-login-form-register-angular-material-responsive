import { Component } from '@angular/core';
import { delayWhen, of, timer } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
interface Genero {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  hide: boolean = true;
  loading: boolean = false;
  demo1TabIndex: any;
  /**
   * Variables para la validación del formulario para los grupos 
   * FormLoginValidateGroup y FormRegisterValidateGroup
   */
  ControlloginUsername = new FormControl('', Validators.required);
  ControlloginPassword = new FormControl('', Validators.required);
  ControlregisterName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  ControlregisterLastName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  ControlregisterUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  ControlregisterEmail = new FormControl('', [Validators.required, Validators.email]);
  ControlregisterDateBirth = new FormControl('', [Validators.required]);
  ControlregisterPhone = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9+]*$')]);
  ControlregisterGenero = new FormControl('', [Validators.required]);
  ControlregisterPassword = new FormControl('', [Validators.required
    , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,100}')]);
  ControlregisterPasswordValidate = new FormControl('', [Validators.required]);
  /**
   * Variables para el login
   */
  loginUsername: string = "";
  loginPassword: string = "";
  /**
   * Variables para el registro
   */
  registerName: string = "";
  registerLastName: string = "";
  registerUser: string = "";
  registerEmail: string = "";
  registerDateBirth?: Date;
  registerPhone: string = "";
  registerGenero: String = '';
  registerPassword: string = "";
  registerPasswordValidate: string = "";
  genero: Genero[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  constructor(private snackbar: SnackbarService) { }
  /**
   * Valida el formulario del grupo Login
   */
  FormLoginValidateGroup = new FormGroup({
    ControlloginUsername: this.ControlloginUsername,
    ControlloginPassword: this.ControlloginPassword
  });
  /**
   * Valida el formulario del grupo Register
   */
  FormRegisterValidateGroup = new FormGroup({
    ControlregisterName: this.ControlregisterName,
    ControlregisterLastName: this.ControlregisterLastName,
    ControlregisterUser: this.ControlregisterUser,
    ControlregisterEmail: this.ControlregisterEmail,
    ControlregisterDateBirth: this.ControlregisterDateBirth,
    ControlregisterPhone: this.ControlregisterPhone,
    ControlregisterGenero: this.ControlregisterGenero,
    ControlregisterPassword: this.ControlregisterPassword,
    ControlregisterPasswordValidate: this.ControlregisterPasswordValidate
  });
  /**
   * login: Simula el logeo luego de haber validado el grupo del formulario Login
   */
  login() {
    this.loading = true;
    if (this.FormLoginValidateGroup.status == 'VALID') {
      of(null).pipe(
        delayWhen(() => timer(1000))
      ).subscribe(() => {
        console.log(this.loginUsername);
        console.log(this.loginPassword);
        this.clearFormLogin();
        this.loading = false;
      });
    } else {
      this.loading = false;
      this.snackbar.warning('No cumple con las validaciones', 'ok');
    }
  }
  /**
   * register: Simula el registro luego de haber validado el grupo del formulario Register
   */
  register() {
    console.log(this.FormRegisterValidateGroup);
    this.loading = true;
    if (this.registerPassword == '') {
      this.ControlregisterPassword.setErrors({ required: true });
    } else if (!(/[!@#$%^&*_=+-]/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ especial: true });
    } else if (!(/(?=.*[0-9])/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ number: true });
    } else if (!(/(?=.*[a-z])/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ minus: true });
    } else if (!(/(?=.*[A-Z])/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ mayus: true });
    } else if (this.registerPassword.length <= 8) {
      this.ControlregisterPassword.setErrors({ min: true });
    } else if (this.registerPassword.length >= 100) {
      this.ControlregisterPassword.setErrors({ max: true });
    }
    if (this.FormRegisterValidateGroup.status == 'VALID') {
      if (this.registerPassword == this.registerPasswordValidate) {
        of(null).pipe(
          delayWhen(() => timer(1000))
        ).subscribe(() => {
          console.log(this.registerName);
          console.log(this.registerLastName);
          console.log(this.registerUser);
          console.log(this.registerEmail);
          console.log(this.registerDateBirth!.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }));
          console.log(this.registerPhone);
          console.log(this.registerGenero);
          console.log(this.registerPassword);
          console.log(this.registerPasswordValidate);
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
   * clearFormLogin: limpia el formulario Login 
   */
  clearFormLogin() {
    this.FormLoginValidateGroup.reset();
    Object.keys(this.FormLoginValidateGroup.controls).forEach(key => {
      this.FormLoginValidateGroup.get(key)?.setErrors(null);
    });
  }
  /**
   * clearFormLogin: limpia el formulario Register 
   */
  clearFormRegister() {
    this.FormRegisterValidateGroup.reset();
    Object.keys(this.FormRegisterValidateGroup.controls).forEach(key => {
      this.FormRegisterValidateGroup.get(key)?.setErrors(null);
    });
  }
}
