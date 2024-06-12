import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_PLAN} from "./helper";


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) {}

  getPlan(): Observable<any> {
    return this.http.get<any>(API_URL_PLAN+"getPlan");
  }

  updatePlan(plan: any): Observable<any> {
    return this.http.put<any>(API_URL_PLAN+"updatePlan/1", { id: 1, content: JSON.stringify(plan) });
  }
}
