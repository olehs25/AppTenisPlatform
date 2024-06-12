import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiPathService {
  private apiUrl = 'https://cloud.uipath.com/cursolkvfeff/DefaultTenant/odata';  // Reemplaza con tu URL
  private authenticateUrl = 'https://cloud.uipath.com/cursolkvfeff/DefaultTenant/api/account/authenticate';  // Reemplaza con tu URL de autenticación
  private apiKey = '14roa8mpwt3qf7DX+cOM7Ge8Xchq1DYYm/s16ve8zQMR2Clua30LVASAfUinoEAC2j1q7UuK5kKdXbTCQxDRPg=='; // Reemplaza con tu API Key

  constructor(private http: HttpClient) { }

  authenticate(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      tenancyName: 'Default', // Reemplaza 'Default' si tienes un tenancy diferente
      usernameOrEmailAddress: 'oleh.s.1997@gmail.com',
      password: 'Villadenijar1'
    };

    return this.http.post(this.authenticateUrl, body, { headers })
      .pipe(map((response: any) => response.result));
  }

  startJob(processKey: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
    const body = {
      startInfo: {
        ReleaseKey: processKey,
        Strategy: 'All',
        RobotIds: [],
        NoOfRobots: 0
      }
    };

    return this.http.post(`${this.apiUrl}/Jobs/UiPath.Server.Configuration.OData.StartJobs`, body, { headers });
  }
}
