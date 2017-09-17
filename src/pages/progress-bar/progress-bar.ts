import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;

  constructor() {
this.progress =100;
  }

}
