import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

/**
 * Clase que arma el snackbar y recibe como parámetros el mensaje y la acción.
 */
export class SnackbarService {
  private config: MatSnackBarConfig;

  constructor(private snackbar: MatSnackBar, private zone: NgZone) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 3000;
  }
  error(message: string, action: any) {
    this.config.panelClass = ["app-notification-error"];
    this.show(message, action);
  }

  success(message: string, action: any) {
    this.config.panelClass = ["app-notification-success"];
    this.show(message, action);
  }

  warning(message: string, action: any) {
    this.config.panelClass = ["app-notification-warning"];
    this.show(message, action);
  }

  private show(message: string, action: any, config?: MatSnackBarConfig) {
    config = config || this.config;
    this.zone.run(() => {
      this.snackbar.open(message, action, config);
    });
  }
}

