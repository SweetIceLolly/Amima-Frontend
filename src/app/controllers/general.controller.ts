import { Injectable } from "@angular/core";

@Injectable()
export class GeneralController {
  prevTimeout: number = 0;

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
}
