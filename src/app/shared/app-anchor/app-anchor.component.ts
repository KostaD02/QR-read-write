import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anchor',
  templateUrl: './app-anchor.component.html',
  styleUrls: ['./app-anchor.component.scss']
})
export class AppAnchorComponent {
  @Input() link: string = ".";
  @Input() target: string = "";
  @Input() text: string = "";
}
