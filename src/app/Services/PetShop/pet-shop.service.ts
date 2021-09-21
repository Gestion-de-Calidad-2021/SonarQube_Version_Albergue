import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetShop } from '../../models/PetShop';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetShopService {
  petShopUrl: string = environment.petShopUrl;
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
    var url = `${this.petShopUrl}/photo`;
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
    var url = `${this.petShopUrl}/photoDelete`;
    return this.http.post<string>(url, formData, options);
  }
  getPetShop(): Observable<PetShop[]> {
    return this.http.get<PetShop[]>(this.petShopUrl);
  }

  updateItemPS(num: string, itemPS: any): Observable<any> {
    let itemSend = JSON.stringify(itemPS);
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.put(`${this.petShopUrl}/${num}`, itemPS, httpOptions);
  }
  postItemPS(itemPS: any): Observable<any> {
    let itemSend = JSON.stringify(itemPS);
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.post<any>(`${this.petShopUrl}`, itemSend, httpOptions);
  }
  deleteItem(num: string): Observable<boolean> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.delete<boolean>(`${this.petShopUrl}/${num}`, httpOptions);
  }
}
