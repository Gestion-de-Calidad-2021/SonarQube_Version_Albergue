import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PetShop } from 'src/app/models/PetShop';
import { PetShopService } from 'src/app/Services/PetShop/pet-shop.service';

@Component({
  selector: 'app-pet-shop',
  templateUrl: './pet-shop.component.html',
  styleUrls: ['./pet-shop.component.css'],
})
export class PetShopComponent implements OnInit {
  products!: PetShop[];
  productsF!: PetShop[];

  formModel!: FormGroup;
  constructor(private petShopService: PetShopService, private fb: FormBuilder) {
    this.formModel = this.fb.group({
      sex: [''],
      size: [''],
      name: [''],
    });
  }

  ngOnInit(): void {
    this.getPetS();
  }

  public filtrar() {
    this.productsF = this.products.filter((product) => {
      return (
        product.sex == this.formModel.value.sex ||
        this.formModel.value.sex == '' ||
        product.sex == 'A'
      );
    });
    this.productsF = this.productsF.filter((product) => {
      return (
        product.sizeOfPet == this.formModel.value.size ||
        this.formModel.value.size == '' ||
        product.sizeOfPet == 'Cualquiera'
      );
    });
    this.productsF = this.productsF.filter((product) => {
      return (
        product.productName
          .toLowerCase()
          .includes(this.formModel.value.name.toLowerCase()) ||
        this.formModel.value.name == ''
      );
    });
  }

  private getPetS() {
    if (
      this.petShopService.getPetShop().subscribe((prod) => {
        this.products = prod;
        this.productsF = prod;
      }) == null
    ) {
      alert('No se encontro');
    }
  }
}
