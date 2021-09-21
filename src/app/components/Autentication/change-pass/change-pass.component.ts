import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/authentication/auth.service';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
})
export class ChangePassComponent implements OnInit {
  invalidLogin!: boolean;
  formModel!: FormGroup;
  constructor(
    private modal: ModalMessageComponent,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.formModel = this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  change() {
    var input!: any;
    input = document.getElementById('ConfirmPassword');
    if (
      this.formModel.invalid ||
      this.formModel.value.ConfirmPassword != this.formModel.value.Password
    ) {
      if (
        this.formModel.value.ConfirmPassword != this.formModel.value.Password
      ) {
        this.show_modal('Las contraseñas no coinciden');
        return;
      } else {
        this.show_modal('Corriga los campos porfavor');
        return;
      }
    }
    let va = this.authService
      .changePassword(this.formModel.value.Password)
      .subscribe(
        (res) => {
          const mes = (<any>res).message;
        },
        (err) => {
          this.invalidLogin = true;
          this.show_modal('La contraseña no se pudo cambiar.');
        },

        () => {
          this.show_modal('Se cambio la contraseña con exito.');
          window.location.href = '/mascotasAd';
        }
      );
  }
  show_modal(message: string) {
    var params = {
      title: 'Cambiar contraseña',
      message: message,
      btns: false,
    };
    this.modal.show_modal(params);
  }
}
