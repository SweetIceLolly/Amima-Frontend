import { Injectable } from "@angular/core";
import { Post } from "../models/Post";

@Injectable()
export class GeneralController {
  searchEventSubs: any = {};
  searchEventIndex: number = 0;
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

  /* ========================================================================================== */
  /* Search Event Notifier */

  subscribeSearchNotifier(callback: (post: Post[] | undefined) => void) {
    this.searchEventSubs[this.searchEventIndex] = callback;
    this.searchEventIndex++;
  }

  unsubscribeSearchNotifier(index: number) {
    delete this.searchEventSubs[index];
  }

  notifySearchNotifier(content: Post[] | undefined) {
    for (let key of Object.keys(this.searchEventSubs)) {
      this.searchEventSubs[key](content);
    }
  }

  /* ========================================================================================== */
}
