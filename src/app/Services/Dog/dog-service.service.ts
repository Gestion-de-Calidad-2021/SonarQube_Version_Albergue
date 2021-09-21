import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog } from '../../models/Dog';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  dogsUrl: string = environment.dogsUrl;
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
    var url = `${this.dogsUrl}/photo`;
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
    var url = `${this.dogsUrl}/photoDelete`;
    return this.http.post<string>(url, formData, options);
  }
  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl);
  }
  getDog(num: string): Observable<Dog> {
    return this.http.get<Dog>(`${this.dogsUrl}/${num}`);
  }
  updateDog(num: string, dog: any): Observable<any> {
    let dogSend = JSON.stringify(dog);
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.put(`${this.dogsUrl}/${num}`, dog, httpOptions);
  }
  postDog(dog: any): Observable<any> {
    let dogSend = JSON.stringify(dog);
    let httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.post<any>(`${this.dogsUrl}`, dogSend, httpOptions);
  }
  deleteDog(num: string): Observable<boolean> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }),
    };
    return this.http.delete<boolean>(`${this.dogsUrl}/${num}`, httpOptions);
  }
}
