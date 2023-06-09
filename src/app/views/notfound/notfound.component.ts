import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl("/");
    }, 10000);
  }
}
