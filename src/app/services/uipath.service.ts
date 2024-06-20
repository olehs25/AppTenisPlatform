import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiPathService {
  private orchestratorUrl = 'https://cloud.uipath.com/cursolkvfeff/portal_/tenant/odata'; // Ajusta esta URL según sea necesario
  private apiKey = 'I/fnqvLT3Lqxt2Xcag+xcHlgg4D9FWBFXFjzZVTaDyQzP9BOzeFWYu3t32fC5gTuC0Ddl9mHFNQ6KSGP3+4Fcw=='; // Reemplaza con tu API key

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
  }

  getJobs(): Observable<any> {
    const url = `${this.orchestratorUrl}/Jobs`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  startJob(processKey: string, inputArguments: any): Observable<any> {
    const url = `${this.orchestratorUrl}/Jobs/UiPath.Server.Configuration.OData.StartJobs`;
    const body = {
      startInfo: {
        ReleaseKey: processKey,
        Strategy: 'ModernJobsCount',
        JobsCount: 1,
        InputArguments: JSON.stringify(inputArguments)
      }
    };
    return this.http.post(url, body, { headers: this.getHeaders() });
  }
}
