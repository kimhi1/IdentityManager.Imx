import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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

export function initMyAccessPortal(init: InitService) {
  return () => init.init();
}

export function initDirectionality(dirService: DirectionalityService) {
  return () => {
    // Note: Replace 'he' with dynamic language code retrieval if supporting multiple languages
    const currentLanguage = 'he-IL'; 
    dirService.applyLanguageDirection(currentLanguage);
  };
}

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
    DirectionalityService,
    { provide: APP_INITIALIZER, useFactory: initMyAccessPortal, deps: [InitService], multi: true },
    { provide: APP_INITIALIZER, useFactory: initDirectionality, deps: [DirectionalityService], multi: true }
  ]
})
export class MyAccessPortalModule { 
  constructor(private extService: ExtService) {
    console.log('%c MyAccessPortalModule LOADED SUCCESSFULLY! ', 'background: #222; color: #bada55; font-size: 20px');
  }
}