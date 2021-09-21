import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dog } from 'src/app/models/Dog';
import { DogService } from 'src/app/Services/Dog/dog-service.service';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';
import { environment } from 'src/environments/environment';
//Seguridad
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css'],
})
export class EditPetComponent implements OnInit {
  sizes!: any;
  genders!: any;
  formModel!: FormGroup;
  singleDog!: Dog;
  image!: File;
  image_dropped: boolean = false;
  validators = {
    name: false,
    year: false,
    month: false,
  };
  mascotaID: string = '';
  constructor(
    private modal: ModalMessageComponent,

    private activeRoute: ActivatedRoute,
    private dogService: DogService,

    private fb: FormBuilder,
    private jwtHelper: JwtHelperService
  ) {
    this.declareVariables();
    this.getPetData();
    this.getSingleDog(this.mascotaID);
    this.formModel = this.fb.group({
      name: [null],
      age: this.fb.group({
        years: [null, [this.ControlYear]],
        months: [null, [this.ControlMonth]],
      }),
      size: [null],
      sterilization: [null],
      sex: [null],
      photo: [null],
      description: [null],
      vaccines: this.fb.group({
        Antirabica: [false],
        Desparasitante: [false],
        Parvovirus:[false],
        Hexavalente:[false],
        Octavalente:[false],
      }),
      isAdopted: [null],
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
    if (years < 0) {
      error = { number: 'Ingrese un año valido' };
    }
    return error;
  }
  private ControlMonth(control: AbstractControl) {
    const months = control.value;
    let error = null;
    if (months < 0 || months > 11) {
      error = { number: 'Ingrese un mes correcto' };
    }
    return error;
  }
  ngOnInit(): void {}
  public declareVariables() {
    this.sizes = ['Pequeño', 'Mediano', 'Grande'];
  }
  private getPetData() {
    this.activeRoute.params.subscribe((params) => {
      this.mascotaID = params['mascotaID'];
    });
  }
  private getSingleDog(idMascota: string) {
    this.dogService.getDog(idMascota).subscribe((dog) => {
      this.singleDog = dog;
    });
  }
  public roundYear(num: number) {
    return Math.trunc(num);
  }
  public async edit_pet() {
    var id = this.singleDog.id;
    let textTotSendVaccines = '';
    if ((document.getElementById('ChA' + id) as HTMLInputElement).checked) {
      textTotSendVaccines += ' Antirrabica';
    }
    if ((document.getElementById('ChD' + id) as HTMLInputElement).checked) {
      textTotSendVaccines += ' Desparasitante';
    }
    if ((document.getElementById('ChPa' + id) as HTMLInputElement).checked) {
      textTotSendVaccines += ' Parvovirus';
    }
    if ((document.getElementById('ChHe' + id) as HTMLInputElement).checked) {
      textTotSendVaccines += ' Hexavalente';
    }
    if ((document.getElementById('ChOc' + id) as HTMLInputElement).checked) {
      textTotSendVaccines += ' Octavalente';
    }
    var photo_url = null;
    if (this.image_dropped) {
      var actual_url = this.singleDog.photo.substring(24);
      this.dogService.deletePhoto(actual_url).subscribe((data) => {});
      photo_url = await this.dogService.postPhoto(this.image).toPromise();
      photo_url = `${environment.ImportPhotoPets}${photo_url}`;
    }
    let dogToSend = {
      name: this.formModel.value.name,
      age:
        this.formModel.value.age.years === null &&
        this.formModel.value.age.months === null
          ? null
          : this.formModel.value.age.years * 12 +
            this.formModel.value.age.months,
      size: this.formModel.value.size,
      sterilization: (document.getElementById('ChE' + id) as HTMLInputElement)
        .checked,
      photo: photo_url,
      description: this.formModel.value.description,
      vaccines: textTotSendVaccines,
      sex: this.formModel.value.sex,
      isAdopted: (document.getElementById('ChAdp' + id) as HTMLInputElement)
        .checked,
    };
  
    this.editSingleDog(dogToSend);
    this.image_dropped = false;
    window.location.href = `/mascotasAd`;
  }
  isVacc(vac: string, listVac: string): boolean {
    if (listVac.includes(vac)) {
      return true;
    } else {
      return false;
    }
  }
  private editSingleDog(dog: any) {
    this.dogService.updateDog(this.mascotaID, dog).subscribe((dog) => {
      this.singleDog = dog;
      this.singleDog.id = this.mascotaID;
    });
  }

  confirm_modal() {
    var input!: any;
    input = document.getElementById('name');
    if (this.formModel.invalid) {
      this.show_modal('Corrija los campos por favor');
      if (!input.checkValidity()) {
        this.validators.name = true;
      }
      return;
    }
    var params = {
      title: 'Editar animal',
      message: 'Confirmar la edición del nuevo animal',
      btns: true,
      object: this,
      confirm_function: this.edit_pet,
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
