import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalListComponent } from './components/Pets/animal-list/animal-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DogService } from './Services/Dog/dog-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/Info/header/header.component';
import { FooterComponent } from './components/Info/footer/footer.component';
import { NoticeComponent } from './components/Notices/notice/notice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SinglePetComponent } from './components/Pets/single-pet/single-pet.component';
import { EditPetComponent } from './components/Pets/edit-pet/edit-pet.component';
import { SinglePetAdminComponent } from './components/Pets/single-pet-admin/single-pet-admin.component';
import { AnimalListAdminComponent } from './components/Pets/animal-list-admin/animal-list-admin.component';
import { AddPetComponent } from './components/Pets/add-pet/add-pet.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { LoginComponent } from './components/Autentication/login/login.component';
import { VolunteersComponent } from './components/Info/volunteers/volunteers.component';
import { NoticeAdminComponent } from './components/Notices/notice-admin/notice-admin.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageDragDirective } from './image-drag.directive';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './guards/auth-guard.service';
import { AboutUsComponent } from './components/Info/about-us/about-us.component';
import { ChangePassComponent } from './components/Autentication/change-pass/change-pass.component';
import { ForgotPassComponent } from './components/Autentication/forgot-pass/forgot-pass.component';
import { PetShopComponent } from './components/PetShop/pet-shop/pet-shop.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { PetShopAdminComponent } from './components/PetShop/pet-shop-admin/pet-shop-admin.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    AnimalListComponent,
    HeaderComponent,
    FooterComponent,
    NoticeComponent,
    SinglePetComponent,
    EditPetComponent,
    SinglePetAdminComponent,
    AnimalListAdminComponent,
    AddPetComponent,
    LoginComponent,
    VolunteersComponent,
    NoticeAdminComponent,
    AboutUsComponent,
    ChangePassComponent,
    ForgotPassComponent,
    ImageUploadComponent,
    ImageDragDirective,
    PetShopComponent,
    ModalMessageComponent,
    PetShopAdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.Url],
        disallowedRoutes: [],
      },
    }),
  ],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatNativeDateModule,
  ],
  providers: [AuthGuard, DogService, ModalMessageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
