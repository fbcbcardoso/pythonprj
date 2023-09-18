import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddFilterService {
  constructor(private http: HttpClient) {}

  changeFilter() {
    return this.http.get(`${environment.URL}/filters`);
  }

  getFilters(filter: string) {
    return this.http.get(`${environment.URL}/filter2`, {
      params: { filter },
    });
  }

  budget() {
    return this.http.get(`${environment.URL}/getBudget`);
  }
}
