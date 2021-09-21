import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dog } from 'src/app/models/Dog';
import { DogService } from 'src/app/Services/Dog/dog-service.service';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';

//Seguridad
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-single-pet-admin',
  templateUrl: './single-pet-admin.component.html',
  styleUrls: ['./single-pet-admin.component.css'],
})
export class SinglePetAdminComponent implements OnInit {
  mascotaID: string = '';
  singleDog!: Dog;
  isNext!: boolean;
  isPrevious!: boolean;
  IsDeleted!: boolean;
  constructor(
    private modal: ModalMessageComponent,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dogService: DogService,
    private modalService: NgbModal,
    private jwtHelper: JwtHelperService
  ) {}
  isUserAuthenticated() {
    var token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {
    this.getPetData();
    this.getSingleDog(this.mascotaID);
  }
  public roundYear(num: number) {
    return Math.trunc(num);
  }
  public deletePet() {
    var actual_url = this.singleDog.photo.substring(24);
    this.dogService.deletePhoto(actual_url).subscribe((data) => {});
    this.dogService.deleteDog(this.mascotaID).subscribe((answer) => {
      this.IsDeleted = answer;
    });
    window.location.href = '/mascotasAd';
  }
  private getPetData() {
    this.activeRoute.params.subscribe((params) => {
      this.mascotaID = params['mascotaID'];
    });
  }
  private getSingleDog(idMascota: string) {
    this.dogService.getDog(idMascota).subscribe((dog) => {
      if (dog.next === null) {
        this.isNext = false;
      } else {
        this.isNext = true;
      }
      if (dog.previous === null) {
        this.isPrevious = false;
      } else {
        this.isPrevious = true;
      }
      this.singleDog = dog;
    });
  }
  public getAnterior() {
    if (this.singleDog.previous != null) {
      window.location.href = `/mascotasAd/${this.singleDog.previous}`;
    } else {
      this.show_modal('No hay anterior');
    }
  }
  public getSiguiente() {
    if (this.singleDog.next != null) {
      window.location.href = `/mascotasAd/${this.singleDog.next}`;
    } else {
      this.show_modal('No hay anterior');
    }
  }
  confirm_modal() {
    var params = {
      title: 'Eliminar animal',
      message: `Se eliminará el animal ${this.singleDog.name}`,
      btns: true,
      object: this,
      confirm_function: this.deletePet,
    };
    this.modal.show_modal(params);
  }
  show_modal(message: string) {
    var params = {
      title: 'Error de acción',
      message: message,
      btns: false,
    };
    this.modal.show_modal(params);
  }
}
