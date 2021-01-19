import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  openLink(link) {

    if (link) {

      const evLink = document.createElement('a');
      evLink.href = link;
      evLink.target = '_blank';
      document.body.appendChild(evLink);
      evLink.click();
      evLink.parentNode.removeChild(evLink);

    }

  }

}
