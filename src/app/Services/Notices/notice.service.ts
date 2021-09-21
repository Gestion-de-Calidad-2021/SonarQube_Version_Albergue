import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notice } from '../../models/Notice';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  noticeUrl: string = environment.noticeUrl;
  constructor(private http: HttpClient) {}
  postPhoto(file: any): Observable<string> {
    var formData: FormData = new FormData();
    formData.append('photo', file);
    var headers_ = new HttpHeaders();
    headers_.append('Content-Type', 'multipart/form-data');
    var options = {
      headers: headers_,
      responseType: 'text' as 'json',
    };
    var url = `${this.noticeUrl}/photo`;
    formData.forEach((value, key) => {});
    return this.http.post<string>(url, formData, options);
  }
  deletePhoto(path: string) {
    var formData: FormData = new FormData();
    formData.append('photo_name', path);
    var headers_ = new HttpHeaders();
    headers_.append('Content-Type', 'multipart/form-data');
    var options = {
      headers: headers_,
    };
    var url = `${this.noticeUrl}/photoDelete`;
    return this.http.post<string>(url, formData, options);
  }
  getNotice(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.noticeUrl);
  }
  updateNotice(num: string, notice: any): Observable<any> {
    let noticeSend = JSON.stringify(notice);
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.put(`${this.noticeUrl}/${num}`, notice, httpOptions);
  }
  postNotice(notice: any): Observable<any> {
    let noticeSend = JSON.stringify(notice);
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.post<any>(`${this.noticeUrl}`, noticeSend, httpOptions);
  }
  deleteNotice(num: string): Observable<boolean> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.delete<boolean>(`${this.noticeUrl}/${num}`, httpOptions);
  }
}
