import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dog } from 'src/app/models/Dog';
import { DogService } from 'src/app/Services/Dog/dog-service.service';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent implements OnInit {

  image!: File;
  sizes!: any;
  genders!: any;
  formModel!: FormGroup;
  singleDog!: Dog;
  image_dropped: boolean = false;
  showAllValidators!: boolean;
  validators = {
    name: false,
    year: false,
    month: false,
  };
  constructor(
    private modal: ModalMessageComponent,
    private dogService: DogService,
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService
  ) {
    this.showAllValidators = false;
    this.formModel = this.fb.group({
      name: ['', Validators.required],
      age: this.fb.group({
        years: ['', [Validators.required, this.ControlYear]],
        months: ['', [Validators.required, this.ControlMonth]],
      }),
      size: ['Pequeño', { onlySelf: true }],
      sterilization: [false],
      sex: ['M'],
      photo: [''],
      description: ['', Validators.required],
      vaccines: this.fb.group({
        Antirabica: [false],
        Desparasitante: [false],
        Parvovirus:[false],
        Hexavalente:[false],
        Octavalente:[false],
      }),
    });
  }
  isUserAuthenticated() {
    var token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  setimageFile(image_: File) {
    this.image = image_;
    this.image_dropped = true;
  }
  private ControlYear(control: AbstractControl) {
    const years = control.value;
    let error = null;
    if (years && years < 0) {
      error = { number: 'Ingrese un año valido' };
    }
    return error;
  }
  private ControlMonth(control: AbstractControl) {
    const months = control.value;
    let error = null;
    if (months && (months < 0 || months > 11)) {
      error = { number: 'Ingrese un mes correcto' };
    }
    return error;
  }

  ngOnInit(): void {
    this.declareVariables();
  }
  public declareVariables() {
    this.sizes = ['Pequeño', 'Mediano', 'Grande'];
  }
  public async register() {
    let textTotSendVaccines = '';
    if (this.formModel.value.vaccines.Antirabica) {
      textTotSendVaccines += ' Antirrabica';
    }
    if (this.formModel.value.vaccines.Desparasitante) {
      textTotSendVaccines += ' Desparasitante';
    }
    if (this.formModel.value.vaccines.Parvovirus) {
      textTotSendVaccines += ' Parvovirus';
    }
    if (this.formModel.value.vaccines.Hexavalente) {
      textTotSendVaccines += ' Hexavalente';
    }
    if (this.formModel.value.vaccines.Octavalente) {
      textTotSendVaccines += ' Octavalente';
    }

    var photo_url = null;
    if (this.image_dropped) {
      photo_url = await this.dogService.postPhoto(this.image).toPromise();
      photo_url = `${environment.ImportPhotoPets}${photo_url}`;
    }
    let dogToSend = {
      name: this.formModel.value.name,
      age:
        this.formModel.value.age.years * 12 + this.formModel.value.age.months,
      size: this.formModel.value.size,
      sterilization: this.formModel.value.sterilization,
      sex: this.formModel.value.sex,
      photo: photo_url,
      description: this.formModel.value.description,
      vaccines: textTotSendVaccines,
      isAdopted: false,
    };
    this.image_dropped = false;
    this.dogService.postDog(dogToSend).subscribe((dog) => {
      this.singleDog = dog;
    });
    window.location.href = '/mascotasAd';
  }
  confirm_modal() {
    var input!: any;
    input = document.getElementById('name');
    if (this.formModel.invalid) {
      this.show_modal('Algunos de los campos deben ser llenados.');
      this.showAllValidators = true;
      if (!input.checkValidity()) {
        this.validators.name = true;
      }
      return;
    }
    var params = {
      title: 'Añadir nuevo animal',
      message: 'Confirmar el registro del nuevo animal',
      btns: true,
      object: this,
      confirm_function: this.register,
    };
    this.modal.show_modal(params);
  }
  show_modal(message: string) {
    var params = {
      title: 'Error de datos',
      message: message,
      btns: false,
    };
    this.modal.show_modal(params);
  }
}
