import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAnswer } from 'src/app/models/AuthAnswer';
import { AuthService } from 'src/app/Services/authentication/auth.service';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidLogin!: boolean;
  formModel!: FormGroup;
  showAllValidators!: boolean;
  singleError!: any;
  validators = {
    Email: false,
    Password: false,
  };
  answer!: AuthAnswer;

  constructor(
    private modal: ModalMessageComponent,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
    this.showAllValidators = false;
  }
  ngOnInit(): void {}

  login() {
    var input!: any;
    input = document.getElementById('Email');
    if (this.formModel.invalid) {
      this.show_modal('Corriga los campos porfavor');
      this.showAllValidators = true;

      return;
    }
    let va = this.authService.login(this.formModel.value).subscribe(
      (res) => {
        const token = (<any>res).message;
        localStorage.setItem('jwt', token);
        this.invalidLogin = false;
      },
      (err) => {
        this.invalidLogin = true;
        this.show_modal('El correo o la contraseña son invalidos.');
      },
      () => {
        this.show_modal('Inicio de sesion realizado con exito.');
        localStorage.setItem('user', this.formModel.value.Email);
        window.location.href = '/mascotasAd';
      }
    );
  }
  show_modal(message: string) {
    var params = {
      title: 'Iniciar Sesión',
      message: message,
      btns: false,
    };
    this.modal.show_modal(params);
  }
}
