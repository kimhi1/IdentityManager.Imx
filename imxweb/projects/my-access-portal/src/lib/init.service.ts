import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Route, Router, Event as RouterEvent } from '@angular/router';
import { AuthenticationService } from 'qbm';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InitService implements OnDestroy {
  // Allow these to be Subscription or null
  private onSessionResponse: Subscription | null = null;
  private routerEvents: Subscription | null = null;
  
  private isLogicActive = false;

  constructor(
    private readonly router: Router,
    private readonly authentication: AuthenticationService
  ) {}

  public onInit(routes: Route[]): void {
    console.log('MyAccessPortal InitService started');

    //this.injectCustomStyles();

    this.addRoutes(routes);

    // 1. Subscribe to session status
    this.onSessionResponse = this.authentication.onSessionResponse.subscribe((session) => {
      // Activate logic ONLY if user is logged in
      if (session && session.IsLoggedIn) {
        if (!this.isLogicActive) {
          this.activateRedirectLogic();
          this.isLogicActive = true;
        }
      } else {
        // User logged out - stop intercepting IMMEDIATELY
        this.stopRedirectLogic();
      }
    });
  }

  private addRoutes(routes: Route[]): void {
    const config = this.router.config;
    routes.forEach((route) => {
      config.unshift(route);
    });
    this.router.resetConfig(config);
  }

  private injectCustomStyles(): void {
    const styleId = 'my-access-portal-custom-styles';
    
    if (document.getElementById(styleId)) {
      return;
    }
    const style = document.createElement('style');
    style.id = styleId;

    style.innerHTML = `
      /* Hide Attestation */
      [data-testid="eui-top-navigation-item-attestation"] { 
        display: none !important; 
      }

      /* Hide Setup */
      [data-testid="eui-top-navigation-item-setup"] { 
        display: none !important; 
      }
    `;

    document.head.appendChild(style);
    console.log('Custom CSS injected to hide menu items.');
  }

  private activateRedirectLogic(): void {
    console.log('User is logged in. Activating Dashboard redirection.');

    // Initial check
    this.checkAndRedirect(this.router.url);

    // Listen to navigation events
    this.routerEvents = this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.checkAndRedirect(event.url);
    });
  }

  private stopRedirectLogic(): void {
    if (this.routerEvents) {
      this.routerEvents.unsubscribe();
      this.routerEvents = null;
    }
    this.isLogicActive = false;
    console.log('Redirect logic stopped (User logged out).');
  }

  private checkAndRedirect(url: string): void {
    if ((url === '/' || url === '/dashboard' || url.startsWith('/dashboard?')) && !url.includes('login')) {
      
      setTimeout(() => {
        if (this.isLogicActive) {
           console.log('Redirecting from default dashboard to My Entitlements...');
           this.router.navigate(['my-entitlements'], { replaceUrl: true });
        }
      }, 100);
    }
  }

  public ngOnDestroy(): void {
    if (this.onSessionResponse) {
      this.onSessionResponse.unsubscribe();
    }
    this.stopRedirectLogic();
  }
}