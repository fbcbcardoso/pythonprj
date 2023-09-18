import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitService {

  constructor( private http: HttpClient) { }

  postNewCommit(body : any) {
    return this.http.post(`${environment.URL}/addMsg` , body);
  }

  getNewCommit(id: number) {
    return this.http.get(`${environment.URL}/getMsg/${id}`);
  }

  postNewFile(body: any , ) {
    return this.http.post(`${environment.URL}/upload` , body);
  }

  getFile(){
    return this.http.get(`${environment.URL}/uploads`);

  }

  downloadFile(id: number){
    return this.http.get(`${environment.URL}/download/${id}`);

  }
}
