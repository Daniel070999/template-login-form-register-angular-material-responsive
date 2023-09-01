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
  //variables de login
  loginUsername: string = "";
  loginPassword: string = "";
  //variables de registro
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

  myGroup = new FormGroup({
    loginUsername: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    loginPassword: new FormControl('', Validators.required)
  });




  login() {
    //console.log(this.myGroup.status);
    console.log(this.myGroup);
    this.loading = true;
    if (this.myGroup.status == 'VALID') {
      of(null).pipe(
        delayWhen(() => timer(3000))
      ).subscribe(() => {
        console.log(this.loginUsername);
        console.log(this.loginPassword);
        this.clearFormLogin();
        this.loading = false;
      });
    } else {
      console.log(this.myGroup.controls.loginUsername.errors);
      this.loading = false;
      this.snackbar.warning('Formulario no valido', 'ok');
    }
  }



  register() {
    this.loading = true;
    if (this.registerName == '' || this.registerLastName == '' || this.registerUser == ''
      || this.registerEmail == '' || this.registerDateBirth == null || this.registerPhone == ''
      || this.registerGenero == '' || this.registerPassword == '' || this.registerPasswordValidate == '') {
      this.loading = false;
      this.snackbar.warning('Debe llenar todos los campos', 'ok');
    } else if (this.registerPassword == this.registerPasswordValidate) {
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
    }
  }
  clearFormLogin() {
    this.loginUsername = '';
    this.loginPassword = '';
  }
  clearFormRegister() {
    this.registerName = '';
    this.registerLastName = '';
    this.registerUser = '';
    this.registerEmail = '';
    this.registerPhone = '';
    this.registerGenero = '';
    this.registerPassword = '';
    this.registerPasswordValidate = '';
  }
}
