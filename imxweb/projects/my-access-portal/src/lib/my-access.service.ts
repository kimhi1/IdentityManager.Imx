import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService, imx_SessionService } from 'qbm';

@Injectable({
  providedIn: 'root'
})
export class MyAccessService {

  private readonly apiBase = '/ApiServer/portal/person';

  constructor(
    private session: imx_SessionService,
    private http: HttpClient,
    private appConfig: AppConfigService
  ) {}

  public async testApiEndpoint(): Promise<any> {
    const apiUrl = '/ApiServer/portal/candidates/Person';
    console.log('Testing API Endpoint:', apiUrl);
    const uid = await this.getUserUid();

    const params = new HttpParams()
      .set('withProperties', 'UID_PersonHead')
      .set('PageSize', '10000');

    return this.http.get(apiUrl, { params }).toPromise();
  }

  public async getDirectReports(): Promise<any[]> {
    const apiUrl = '/ApiServer/portal/candidates/Person';
    const myUid = await this.getUserUid();
    if (!myUid) return [];

    const params = new HttpParams()
      .set('withProperties', 'UID_PersonHead,IsInActive')
      .set('PageSize', '100000');

    console.log('Fetching Direct Reports from:', apiUrl);

    const res = await this.http.get<any>(apiUrl, { params }).toPromise()

    const usersWithManager = res?.Entities || (Array.isArray(res) ? res : []);

    const myReports = usersWithManager.filter((user: any) => {
      const manager = user.Columns.UID_PersonHead.Value;
      const isActive = user.Columns.IsInActive.Value === false;

      return manager === myUid && isActive;
    });

    return myReports;
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

    const params = new HttpParams()
      .set('PageSize', '1000')

    const membership = await this.http.get<{ Entities: any[] }>(url, { params }).toPromise().then(res => res?.Entities || []);

    const fullRoles = await Promise.all(membership.map(async (item) =>{
      const orgUid = item.Columns.UID_Org.Value;
      
      
      const orgDetails = await this.getOrgDetails(orgUid);

      if(orgDetails) {
        return {...item, OrgDetails: orgDetails};
      } else {
        return null;
      }
    }));

    return fullRoles.filter(item => item !== null);
  }

  public async getEntitlements(targetUid?: string): Promise<any[]> {
    const uid = targetUid || (await this.getUserUid());
    if (!uid) return [];

    const url = `${this.apiBase}/${uid}/rolememberships/ESet`;

    console.log('Fetching Entitlements from:', url);

    return this.http.get<{ Entities: any[] }>(url).toPromise().then(res => res?.Entities || []);
  }

  public async getOrgDetails(uidOrg: string) {
    const url = `/ApiServer/portal/admin/role/org/interactive/${uidOrg}`;

    const res = await this.http.get<any>(url).toPromise().catch(err => {
      console.warn(`Org ${uidOrg} is restricted or failed to load.`);
      return null;
    });

    return res;
  }

  public async getUserRequests(targetUid?: string): Promise<any[]> {
    const uid = targetUid || (await this.getUserUid());
    if (!uid) return [];

    const url = '/portal/itshop/requests';

    const params = new HttpParams()
      .set('PageSize', '5') 
      .set('OrderBy', 'OrderDate desc')
      .set('ShowMyPending', '1');

    return this.http.get<{ Entities: any[] }>(url, { params })
      .toPromise()
      .then(res => res?.Entities || [])
      .catch(err => {
        console.error('Error fetching requests', err);
        return [];
      });
  }

  private async getUserUid(): Promise<string | undefined> {
    const state = await this.session.getSessionState();
    return state?.UserUid ?? undefined;
  }

  public async getCurrentUserUid(): Promise<string | undefined> {
    return this.getUserUid();
  }
}