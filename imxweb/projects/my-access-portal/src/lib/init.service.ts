import { Injectable } from '@angular/core';
import { ExtService } from 'qbm';
import { AccessTileComponent } from './access-tile/access-tile.component';

@Injectable({ providedIn: 'root' })
export class InitService {
  constructor(private readonly extService: ExtService) {}

  public init(): void {
    this.extService.register('Dashboard-SmallTiles', { instance: AccessTileComponent });
    console.log('[MyAccessPortal] Tile registered');
  }
}