import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { RTL_GLOBAL_STYLES } from './rtl-styles';

@Injectable({
  providedIn: 'root'
})
export class DirectionalityService {
  private renderer: Renderer2;
  private styleElement: HTMLStyleElement | null = null;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public applyLanguageDirection(languageCode: string): void {
    // Check if the active language is Hebrew to apply right-to-left alignment
    if (languageCode === 'he' || languageCode === 'he-IL') {
      this.renderer.setAttribute(this.document.documentElement, 'dir', 'rtl');
      this.injectRtlStyles();
    } else {
      this.renderer.setAttribute(this.document.documentElement, 'dir', 'ltr');
      this.removeRtlStyles();
    }
  }

  // Inject the global RTL styles into the document head
  private injectRtlStyles(): void {
    if (!this.styleElement) {
      this.styleElement = this.renderer.createElement('style');
      this.renderer.appendChild(this.styleElement, this.renderer.createText(RTL_GLOBAL_STYLES));
      this.renderer.appendChild(this.document.head, this.styleElement);
    }
  }

  // Remove the styles when switching back to LTR
  private removeRtlStyles(): void {
    if (this.styleElement) {
      this.renderer.removeChild(this.document.head, this.styleElement);
      this.styleElement = null;
    }
  }
}