import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionalityService {
  private renderer: Renderer2;

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
    } else {
      this.renderer.setAttribute(this.document.documentElement, 'dir', 'ltr');
    }
  }
}