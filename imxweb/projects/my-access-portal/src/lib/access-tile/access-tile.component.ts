import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-access-tile',
  templateUrl: './access-tile.component.html',
  styleUrls: ['./access-tile.component.css']
})
export class AccessTileComponent {

  constructor(private router: Router) { }

  openPage(): void {
    
    this.router.navigate(['my-entitlements']);
  }
}