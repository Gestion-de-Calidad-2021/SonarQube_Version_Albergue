import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService } from 'src/app/Services/Dog/dog-service.service';
import { Dog } from '../../../models/Dog';
import { ModalMessageComponent } from '../../modal-message/modal-message.component';

@Component({
  selector: 'app-single-pet',
  templateUrl: './single-pet.component.html',
  styleUrls: ['./single-pet.component.css'],
})
export class SinglePetComponent implements OnInit {
  mascotaID: string = '';
  singleDog!: Dog;
  isNext!: boolean;
  isPrevious!: boolean;
  constructor(
    private modal: ModalMessageComponent,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dogService: DogService
  ) {}
  ngOnInit(): void {
    this.getPetData();
    this.getSingleDog(this.mascotaID);
  }
  public roundYear(num: number) {
    return Math.trunc(num);
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
      window.location.href = `/mascotas/${this.singleDog.previous}`;
    } else {
      this.show_modal('No hay animal anterior');
    }
  }
  public getSiguiente() {
    if (this.singleDog.next != null) {
      window.location.href = `/mascotas/${this.singleDog.next}`;
    } else {
      this.show_modal('No hay animal siguiente');
    }
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
