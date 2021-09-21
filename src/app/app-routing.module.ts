import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPetComponent } from './components/Pets/add-pet/add-pet.component';
import { AnimalListAdminComponent } from './components/Pets/animal-list-admin/animal-list-admin.component';
import {AnimalListComponent} from './components/Pets/animal-list/animal-list.component'
import { EditPetComponent } from './components/Pets/edit-pet/edit-pet.component';
import { LoginComponent } from './components/Autentication/login/login.component';
import { NoticeComponent } from './components/Notices/notice/notice.component';
import { NoticeAdminComponent } from './components/Notices/notice-admin/notice-admin.component';
import { SinglePetAdminComponent } from './components/Pets/single-pet-admin/single-pet-admin.component';
import { SinglePetComponent } from './components/Pets/single-pet/single-pet.component';
import { VolunteersComponent } from './components/Info/volunteers/volunteers.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AboutUsComponent } from './components/Info/about-us/about-us.component';
import { ChangePassComponent } from './components/Autentication/change-pass/change-pass.component';
import { ForgotPassComponent } from './components/Autentication/forgot-pass/forgot-pass.component';
import {ImageUploadComponent} from './components/image-upload/image-upload.component'
import {PetShopComponent} from './components/PetShop/pet-shop/pet-shop.component';
import {PetShopAdminComponent} from './components/PetShop/pet-shop-admin/pet-shop-admin.component'


const routes: Routes = [
  {path:'',component:NoticeComponent},
  {path:'upload',component:ImageUploadComponent},
  {path:'noticeAdm',component:NoticeAdminComponent,canActivate:[AuthGuard]},
  {path:'volunteers',component:VolunteersComponent},
  {path:'nosotros',component:AboutUsComponent},
  {path:'login',component:LoginComponent},
  {path:'mascotas',component:AnimalListComponent},
  {path:'mascotas/:mascotaID',component:SinglePetComponent},
  {path:'mascotasAd/:mascotaID',component:SinglePetAdminComponent,canActivate:[AuthGuard]},
  {path:'mascotasAd',component:AnimalListAdminComponent,canActivate:[AuthGuard]},
  {path:'editPet/:mascotaID',component:EditPetComponent,canActivate:[AuthGuard]},
  {path:'añadirMascota', component: AddPetComponent,canActivate:[AuthGuard]},
  {path:'cambiarContraseña',component:ChangePassComponent,canActivate:[AuthGuard]},
  {path:'olvidarContraseña',component:ForgotPassComponent},
  {path:'petShop',component:PetShopComponent},
  {path:'petShopAdm',component:PetShopAdminComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
