import { Component, OnInit } from '@angular/core';
import { Dog } from '../../../models/Dog';
import { DogService } from '../../../Services/Dog/dog-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent implements OnInit {
  dogs!: Dog[];
  dogsF!: Dog[];

  formModel!: FormGroup;
  constructor(private dogService: DogService, private fb: FormBuilder) {
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

  public roundYear(num: number): number {
    return Math.trunc(num);
  }
  private getDogs() {
    if (
      this.dogService.getDogs().subscribe((dog) => {
        dog.sort(function (a, b) {
          return a.age - b.age;
        });
        dog = dog.filter((d) => !d.isAdopted);
        this.dogs = dog;
        this.dogsF = dog;
      }) == null
    ) {
    }
  }
}
