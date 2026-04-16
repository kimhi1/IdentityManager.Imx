import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; // Angular BTN
import { MatCardModule } from '@angular/material/card'; // Card for Tile
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ExtService } from 'qbm';
import { AccessTileComponent } from './access-tile/access-tile.component';
import { DirectionalityService } from './directionality.service';
import { InitService } from './init.service';
import { MyEntitlementsPageComponent } from './my-entitlements-page/my-entitlements-page.component';

const routes: Routes = [
  { path: 'my-entitlements', component: MyEntitlementsPageComponent }
];

@NgModule({
  declarations: [
    AccessTileComponent,
    MyEntitlementsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AccessTileComponent,
    MyEntitlementsPageComponent
  ],
  providers: [
    InitService,
    DirectionalityService
  ]
})
export class MyAccessPortalModule { 
  constructor(private extService: ExtService,  private initializer: InitService, private dirService: DirectionalityService) {
    console.log('%c MyAccessPortalModule LOADED SUCCESSFULLY! ', 'background: #222; color: #bada55; font-size: 20px');

    this.initializer.onInit(routes);
    this.dirService.applyLanguageDirection('he-IL');

  }
}