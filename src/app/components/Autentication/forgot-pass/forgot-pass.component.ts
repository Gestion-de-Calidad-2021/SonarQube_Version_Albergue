import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAnswer } from 'src/app/models/AuthAnswer';
import { UserModel } from 'src/app/models/User';
import { AuthService } from 'src/app/Services/authentication/auth.service';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent implements OnInit {
  invalidLogin!: boolean;
  formModel!: FormGroup;
  showAllValidators!: boolean;
  singleError!: any;
  Users!: UserModel[];
  validators = {
    Email: false,
  };
  answer!: AuthAnswer;
  characters: any;
  constructor(
    private modal: ModalMessageComponent,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.group({
      Email: ['', Validators.required],
    });
    this.showAllValidators = false;
  }
  ngOnInit(): void {
    this.authService.getUsers().subscribe(
      (us) => {
        this.Users = us;
      },
      (err) => {
        this.show_modal('Hay un error');
      }
    );
  }
  generatePasswordRand(length: any, type: any) {
    switch (type) {
      case 'num':
        this.characters = '0123456789';
        break;
      case 'alf':
        this.characters =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case 'rand':
        //FOR ↓
        break;
      default:
        this.characters =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        break;
    }
    var pass = '';
    for (let i = 0; i < length; i++) {
      if (type == 'rand') {
        pass += String.fromCharCode(
          (Math.floor(Math.random() * 100) % 94) + 33
        );
      } else {
        pass += this.characters.charAt(
          Math.floor(Math.random() * this.characters.length)
        );
      }
    }
    return pass;
  }

  sendEmail() {
    var input!: any;
    let existeusuario = false;
    input = document.getElementById('Email');
    if (this.formModel.invalid) {
      this.show_modal('Corriga los campos porfavor');
      this.showAllValidators = true;
      return;
    }
    this.Users.forEach((singleUser) => {
      if (singleUser.email == this.formModel.value.Email) {
        existeusuario = true;
        localStorage.setItem('user', this.formModel.value.Email);
      }
    });

    if (existeusuario) {
      //Change Password
      var newPAss = this.generatePasswordRand(10, 'rand') + 'A' + '4';
      let va = this.authService.changePassword(newPAss).subscribe(
        (res) => {
          const mes = (<any>res).message;
        },
        (err) => {
          this.invalidLogin = true;
          this.show_modal('La contraseña no se pudo cambiar.');
        }
      );

      //Enviar Mail
      this.authService.sendEmail(this.formModel.value.Email, newPAss).subscribe(
        (response) => {},
        (err) => {
          this.invalidLogin = true;
          this.show_modal('La contraseña no se pudo cambiar.');
        },
        () => {
          this.show_modal('Se le enviara el correo en unos minutos');
          window.location.href = '/login';
        }
      );
    } else {
      this.show_modal('El correo no se encuentra registrado');
      window.location.href = '/login';
    }
  }
  show_modal(message: string) {
    var params = {
      title: 'Nueva Contraseña',
      message: message,
      btns: false,
    };
    this.modal.show_modal(params);
  }
}
