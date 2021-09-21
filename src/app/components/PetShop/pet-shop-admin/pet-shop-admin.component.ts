import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PetShop } from 'src/app/models/PetShop';
import { PetShopService } from 'src/app/Services/PetShop/pet-shop.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-pet-shop-admin',
  templateUrl: './pet-shop-admin.component.html',
  styleUrls: ['./pet-shop-admin.component.css'],
})
export class PetShopAdminComponent implements OnInit {
  sizes!: any;
  generos!: any;
  products!: PetShop[];
  formModel!: FormGroup;
  product!: PetShop;
  showAllValidators!: boolean;
  image!: File;
  image_dropped: boolean = false;
  productsF!: PetShop[];
  constructor(
    private petShopService: PetShopService,
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService
  ) {
    this.showAllValidators = false;
    this.formModel = this.fb.group({
      productName: ['', Validators.required],
      sex: [''],
      photo: [''],
      category: ['', Validators.required],
      sizeOfPet: [''],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      name: [''],
      size: [''],
      sexo: [''],
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
  ngOnInit(): void {
    this.getPetS();
    this.declareVariables();
    this.declareSexos();
  }
  public declareVariables() {
    this.sizes = ['Cualquiera', 'Pequeño', 'Mediano', 'Grande'];
  }
  public declareSexos() {
    this.generos = ['Ambos', 'Macho', 'Hembra'];
  }
  public filtrar() {
    this.productsF = this.products.filter((product) => {
      return (
        product.sex == this.formModel.value.sexo ||
        this.formModel.value.sexo == '' ||
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

  setimageFile(image_: File) {
    this.image = image_;
    this.image_dropped = true;
  }

  public async register() {
    if (this.formModel.invalid) {
      this.showAllValidators = true;
      return;
    }
    var photo_url = null;
    if (this.image_dropped) {
      photo_url = await this.petShopService.postPhoto(this.image).toPromise();
      photo_url = `${environment.ImportPhotoProducts}${photo_url}`;
    }
    let productToSend = {
      productName: this.formModel.value.productName,
      sex: this.formModel.value.sex,
      photo: photo_url,
      category: this.formModel.value.category,
      sizeOfPet: this.formModel.value.sizeOfPet,
      price: this.formModel.value.price.toString(),
      stock: this.formModel.value.stock,
    };
    this.petShopService.postItemPS(productToSend).subscribe((product) => {});
    this.image_dropped = false;
    var message = document.getElementById('addMessage');
    message ? (message.innerHTML = 'Se ha añadido el producto.') : message;
    window.location.href = '/petShopAdm';
  }

  public async edit(id: string) {
    var photo_url = null;
    if (this.image_dropped) {
      var singleProduct = this.products.find((product) => {
        return `${product.id}` == id;
      });
      singleProduct = singleProduct ? singleProduct : new PetShop();
      var actual_url = singleProduct.photo.substring(29);
      this.petShopService.deletePhoto(actual_url).subscribe((data) => {});
      photo_url = await this.petShopService.postPhoto(this.image).toPromise();
      photo_url = `${environment.ImportPhotoProducts}${photo_url}`;
    }
    let productToSend = {
      productName: this.formModel.value.productName
        ? this.formModel.value.productName
        : null,
      sex: this.formModel.value.sex === '' ? null : this.formModel.value.sex,
      photo: photo_url,
      category: this.formModel.value.category
        ? this.formModel.value.category
        : null,
      sizeOfPet:
        this.formModel.value.sizeOfPet === ''
          ? null
          : this.formModel.value.sizeOfPet,
      price: this.formModel.value.price ? this.formModel.value.price : null,
      stock: this.formModel.value.stock ? this.formModel.value.stock : null,
    };
    this.image_dropped = false;
    this.petShopService
      .updateItemPS(id, productToSend)
      .subscribe(() => {});
    var message = document.getElementById('editMessage');
    message ? (message.innerHTML = 'Se ha editado el producto.') : message;
    window.location.href = '/petShopAdm';
  }

  public delete(id: string) {
    var singleProduct = this.products.find((product) => {
      return `${product.id}` == id;
    });
    singleProduct = singleProduct ? singleProduct : new PetShop();
    var actual_url = singleProduct.photo.substring(29);
    this.petShopService.deletePhoto(actual_url).subscribe(() => {});
    this.petShopService.deleteItem(id).subscribe(() => {});
    window.location.href = '/petShopAdm';
  }
}
