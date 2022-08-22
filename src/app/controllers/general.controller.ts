import { Injectable } from "@angular/core";

@Injectable()
export class GeneralController {
  prevTimeout: number = 0;
  loginObservers: Array<(user_id: string, token: string) => void> = [];
  logoutObservers: Array<() => void> = [];

  constructor() {}

  showMessageToast(message: string, width: number = -1, timeout: number = 3000) {
    // Cancel previous timeout
    clearTimeout(this.prevTimeout);

    let snackbarElem = document.getElementById("snackbar");
    if (snackbarElem) {
      snackbarElem.className = "show";
      snackbarElem.style.width = width === -1 ? 'auto' : width.toString() + 'px';
      snackbarElem.innerHTML = message;
    }
    else {
      alert(message);
      return;
    }

    this.prevTimeout = setTimeout(() => {
      if (snackbarElem) {
        snackbarElem.className = snackbarElem.className.replace("show", "");
      }
    }, timeout);
  }

  showMessageBox(message: string) {

  }

  /**
   * Provide a callback function to be called when the user logs in
   */
  subscribeLoginCallback(callbackFunction: (user_id: string, token: string) => void) {
    this.loginObservers.push(callbackFunction);
  }

  /**
   * Provide a callback function to be called when the user logs out
   */
  subscribeLogoutCallback(callbackFunction: () => void) {
    this.logoutObservers.push(callbackFunction);
  }

  /**
   * Call all the login callback functions
   */
  triggerLoginSubscription(user_id: string, token: string) {
    this.loginObservers.forEach(callback => {
      callback(user_id, token);
    });
  }

  /**
   * Call all the logout callback functions
   */
  triggerLogoutSubscription() {
    this.logoutObservers.forEach(callback => {
      callback();
    });
  }
}
