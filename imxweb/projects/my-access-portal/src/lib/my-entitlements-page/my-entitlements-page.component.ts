import { Component, OnInit } from '@angular/core';
import { MyAccessService } from '../my-access.service';

@Component({
  selector: 'lib-my-entitlements-page',
  templateUrl: './my-entitlements-page.component.html',
  styleUrl: './my-entitlements-page.component.css'
})
export class MyEntitlementsPageComponent implements OnInit {

  public businessRoles: any[] = [];
  public requests: any[] = [];
  public apiTestResult: any[] = [];
  public directReports: any[] = [];

  public isLoading = false;

  constructor(private myAccess: MyAccessService) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      console.log('Starting data fetch...');

      // console.log('checking API endpoint...');
      // this.apiTestResult = await this.myAccess.testApiEndpoint();
      // console.log('API endpoint test result:', this.apiTestResult);
      
      this.businessRoles = await this.myAccess.getBusinessRoles();
      console.log('Roles loaded:', this.businessRoles);

      this.requests = await this.myAccess.getUserRequests();
      console.log('Requests loaded:', this.requests);

      this.directReports = await this.myAccess.getDirectReports();
      console.log('Direct reports loaded:', this.directReports);

    } catch (error) {
      console.error('Error fetching access data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /*public async onUserChange() {
    await this.loadDataForSelectedUser();
  }

  private async loadDataForSelectedUser() {
    this.isLoading = true;
    this.businessRoles = [];
    this.requests = [];

    try {
      const [roles, reqs] = await Promise.all([
        this.myAccess.getBusinessRoles(this.selectedUserUid),
        this.myAccess.getUserRequests(this.selectedUserUid)
      ]);

      this.businessRoles = roles;
      this.requests = reqs;

    } catch (error) {
      console.error('Error fetching access data for user', error);
    } finally {
      this.isLoading = false;
    }
  
  }*/
}