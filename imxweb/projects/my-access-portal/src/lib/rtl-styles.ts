export const RTL_GLOBAL_STYLES = `
  html[dir="rtl"] .mat-sidenav-content,
  html[dir="rtl"] .mat-drawer-content {
    margin-left: 0 !important;
    margin-right: 230px !important;
  }

  html[dir="rtl"] .mat-mdc-form-field,
  [dir="rtl"] .mat-mdc-form-field {
    direction: rtl !important;
    text-align: right !important;
  }
  .mat-mdc-card,
  .mat-mdc-tab-labels {
    direction: rtl !important;
  }
  .eui-sidesheet .mat-toolbar {
    direction: rtl !important;
  }
  .imx-flex-toggle-container {
    direction: rtl !important;
  }

`;