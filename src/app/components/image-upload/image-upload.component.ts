import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FileHandle } from '../../models/file-handle';
import { AddPetComponent } from '../Pets/add-pet/add-pet.component';
import { EditPetComponent } from '../Pets/edit-pet/edit-pet.component';
import { NoticeAdminComponent } from '../Notices/notice-admin/notice-admin.component';
import { ModalMessageComponent } from '../modal-message/modal-message.component';
import { PetShopAdminComponent } from '../PetShop/pet-shop-admin/pet-shop-admin.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  @Input('view') view!:
    | AddPetComponent
    | EditPetComponent
    | NoticeAdminComponent
    | PetShopAdminComponent;
  uploadedFiles!: FileHandle[];
  firstFile!: File;
  dropped!: boolean;
  constructor(private sanitizer:DomSanitizer) {}
  ngOnInit(): void {
    this.dropped = false;
  }
  public uploadFile = (files: any) => {
    if (files) {
      var new_files: FileHandle[] = [];
      for (const file of files) {
        let url = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
        new_files.push({file, url});
      }
      this.filesDropped(new_files);
    }
  };

  filesDropped(files: FileHandle[]) {
    console.log(files);
    this.uploadedFiles = files;
    this.firstFile = files[0].file;
    this.view.setimageFile(this.firstFile);
    this.dropped = true;
  }
}
