import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegraData } from '../components/home/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }


  getDadosGrid() {
    return this.http.get<RegraData[]>(`${environment.URL}/requests`);
  }

  getDadosbyId(id: number) {
    return this.http.get<RegraData[]>(`${environment.URL}/request/${id}`);
  }

  getItembyId(id: number) {
    return this.http.get<RegraData[]>(`${environment.URL}/requestItem/${id}`);
  }

  getPending() {
    return this.http.get<RegraData[]>(`${environment.URL}/requestsPending`);
  }


  getPersonDadosGrid(params : any) {
    return this.http.get<RegraData[]>(`${environment.URL}/requests/date3${params}`);
  }

  updateStatus(id : any , body : any ){
    return this.http.patch(`${environment.URL}/updateStatus/${id}` , body);

   }
}
