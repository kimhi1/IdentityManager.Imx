import { Component, OnInit } from '@angular/core';
import { MyAccessService } from '../my-access.service';

interface UserOption {
  Uid: string;
  Display: string;
  IsMe: boolean;
}

@Component({
  selector: 'lib-my-entitlements-page',
  templateUrl: './my-entitlements-page.component.html',
  styleUrl: './my-entitlements-page.component.css'
})
export class MyEntitlementsPageComponent implements OnInit {

  public businessRoles: any[] = [];
  public entitlements: any[] = [];

  public availableUsers: UserOption[] = [];
  public selectedUserUid: string = '';
  public isLoading = false;

  constructor(private myAccess: MyAccessService) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      console.log('Starting data fetch...');

      /*console.log('checking API endpoint...');
      this.apiTestResult = await this.myAccess.testApiEndpoint();
      console.log('API endpoint test result:', this.apiTestResult);*/
      
      this.businessRoles = await this.myAccess.getBusinessRoles();
      console.log('Roles loaded:', this.businessRoles);

      this.entitlements = await this.myAccess.getEntitlements();
      console.log('Entitlements loaded:', this.entitlements);

    } catch (error) {
      console.error('Error fetching access data:', error);
    } finally {
      this.isLoading = false;
    }
  }
}