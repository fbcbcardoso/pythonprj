import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewSolicitService {
  constructor(private http: HttpClient) {}

  postNewSolicit(body : any) {
    return this.http.post(`${environment.URL}/addRequest` , body);
  }
  postNewItem(body : any) {
    return this.http.post(`${environment.URL}/addItem` , body);
  }
  postNewSolicit2() {
    return this.http.get(`${environment.URL}/filters`);
  }
  getColab(colab : string) {
    return this.http.get(`${environment.URL}/colabs?filtros=${colab}`);
  }
  patchRequestCab(id : number , body : any) {
    return this.http.patch(`${environment.URL}/updateRequestCab/${id}`, body);
  }
  patchRequestItm(id : number , body : any) {
    return this.http.patch(`${environment.URL}/updateRequest/${id}`, body);
  }
}
