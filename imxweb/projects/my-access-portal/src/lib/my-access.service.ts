import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService, imx_SessionService } from 'qbm';

@Injectable({
  providedIn: 'root'
})
export class MyAccessService {

  private readonly apiBase = '/ApiServer/portal/person';

  private readonly personAdminUrl = '/ApiServer/portal/admin/person';

  constructor(
    private session: imx_SessionService,
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}

  public async testApiEndpoint(): Promise<any> {
    const apiUrl = '/portal/admin/person';
    console.log('Testing API Endpoint:', apiUrl);
    return this.http.get(apiUrl).toPromise();
  }

  public async getDirectReports(): Promise<any[]> {
    const myUid = await this.getUserUid();
    if (!myUid) return [];

    const params = new HttpParams()
      .set('whereClause', `UID_PersonHead = '${myUid}'`);

    console.log('Fetching Direct Reports from:', this.personAdminUrl);

    return this.http.get<any>(this.personAdminUrl, { params })
      .toPromise()
      .then(res => res?.Entities || (Array.isArray(res) ? res : []));
  }

  public async getTestPerson(): Promise<any> {
    const state = await this.session.getSessionState();
    const userUid = state?.UserUid;

    if (!userUid) {
      console.error('No UserUid found in session!');
      return;
    }

    const url = `/ApiServer/portal/admin/person/interactive/${userUid}`;

    console.log('Testing API Connection with URL:', url);

    return this.http.get(url).toPromise();
  }

  public async getBusinessRoles(targetUid?: string): Promise<any[]> {
    const uid = targetUid || (await this.getUserUid());
    if (!uid) return [];

    const url = `${this.apiBase}/${uid}/rolememberships/Org`;
    console.log('Fetching Business Roles from:', url);

    return this.http.get<{ Entities: any[] }>(url).toPromise().then(res => res?.Entities || []);
  }

  public async getEntitlements(targetUid?: string): Promise<any[]> {
    const uid = targetUid || (await this.getUserUid());
    if (!uid) return [];

    const url = `${this.apiBase}/${uid}/rolememberships/ESet`;

    console.log('Fetching Entitlements from:', url);

    return this.http.get<{ Entities: any[] }>(url).toPromise().then(res => res?.Entities || []);
  }

  private async getUserUid(): Promise<string | undefined> {
    const state = await this.session.getSessionState();
    return state?.UserUid ?? undefined;
  }
}