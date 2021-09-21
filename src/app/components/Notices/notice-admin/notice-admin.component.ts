import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/models/Notice';
import { NoticeService } from 'src/app/Services/Notices/notice.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  NgModelGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-notice-admin',
  templateUrl: './notice-admin.component.html',
  styleUrls: ['./notice-admin.component.css'],
})
export class NoticeAdminComponent implements OnInit {
  notices!: Notice[];
  formModel!: FormGroup;
  notice!: Notice;
  showAllValidators!: boolean;
  image!: File;
  image_dropped: boolean = false;
  constructor(
    private noticeService: NoticeService,
    private fb: FormBuilder,
    private jwtHelper: JwtHelperService
  ) {
    this.showAllValidators = false;
    this.formModel = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      date: ['', Validators.required],
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
    if (
      this.noticeService.getNotice().subscribe((notice) => {
        this.notices = notice;
      }) == null
    ) {
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
      photo_url = await this.noticeService.postPhoto(this.image).toPromise();
      photo_url = `${environment.ImportPhotoNotices}${photo_url}`;
    }
    let noticeToSend = {
      title: this.formModel.value.title,
      image: photo_url,
      date: this.formModel.value.date,
    };
    this.noticeService.postNotice(noticeToSend).subscribe((notice) => {});
    this.image_dropped = false;
    var message = document.getElementById('addMessage');
    message ? (message.innerHTML = 'Se ha añadido la noticia.') : message;
    window.location.href = '/noticeAdm';
  }
  public async edit(id: string) {
    var photo_url = null;
    if (this.image_dropped) {
      var singleNotice = this.notices.find((notice) => {
        return `${notice.id}` == id;
      });
      singleNotice = singleNotice ? singleNotice : new Notice();
      var actual_url = singleNotice.image.substring(27);
      this.noticeService.deletePhoto(actual_url).subscribe((data) => {});
      photo_url = await this.noticeService.postPhoto(this.image).toPromise();
      photo_url = `${environment.noticeUrl}${photo_url}`;
    }
    let noticeToSend = {
      title: this.formModel.value.title ? this.formModel.value.title : null,
      image: photo_url,
      date: (document.getElementById('edi-fech' + id) as HTMLInputElement)
        .value,
    };
    this.image_dropped = false;
    this.noticeService
      .updateNotice(id, noticeToSend)
      .subscribe((updatedNotice) => {});
    var message = document.getElementById('editMessage');
    message ? (message.innerHTML = 'Se ha editado la noticia.') : message;
    window.location.href = '/noticeAdm';
  }
  public delete(id: string) {
    var singleNotice = this.notices.find((notice) => {
      return `${notice.id}` == id;
    });
    singleNotice = singleNotice ? singleNotice : new Notice();
    var actual_url = singleNotice.image.substring(27);
    this.noticeService.deletePhoto(actual_url).subscribe((data) => {});
    this.noticeService.deleteNotice(id).subscribe((answer) => {});
    window.location.href = '/noticeAdm';
  }
}
