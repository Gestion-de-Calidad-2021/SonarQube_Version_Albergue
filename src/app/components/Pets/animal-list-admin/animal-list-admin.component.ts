import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/app/models/Dog';
import { DogService } from 'src/app/Services/Dog/dog-service.service';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-animal-list-admin',
  templateUrl: './animal-list-admin.component.html',
  styleUrls: ['./animal-list-admin.component.css'],
})
export class AnimalListAdminComponent implements OnInit {
  dogs!: Dog[];
  dogsF!: Dog[];
  formModel!: FormGroup;
  constructor(
    private dogService: DogService,
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService
  ) {
    this.formModel = this.fb.group({
      age: [''],
      sex: [''],
      size: [''],
      name: [''],
    });
  }

  ngOnInit(): void {
    this.getDogs();
  }

  isUserAuthenticated() {
    var token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  public filtrar() {
    this.dogsF = this.dogs.filter((dog) => {
      return (
        dog.sex == this.formModel.value.sex || this.formModel.value.sex == ''
      );
    });
    this.dogsF = this.dogsF.filter((dog) => {
      return (
        (dog.age > parseInt(this.formModel.value.age.split('-')[0]) &&
          dog.age < parseInt(this.formModel.value.age.split('-')[1])) ||
        this.formModel.value.age == ''
      );
    });
    this.dogsF = this.dogsF.filter((dog) => {
      return (
        dog.size == this.formModel.value.size || this.formModel.value.size == ''
      );
    });
    this.dogsF = this.dogsF.filter((dog) => {
      return dog.name
        .toLowerCase()
        .includes(this.formModel.value.name.toLowerCase());
    });
  }

  public roundYear(num: number) {
    return Math.trunc(num);
  }
  private getDogs() {
    if (
      this.dogService.getDogs().subscribe((dog) => {
        dog.sort(function (a, b) {
          return a.age - b.age;
        });
        this.dogs = dog;
        this.dogsF = dog;
      }) == null
    ) {
    }
  }
}
