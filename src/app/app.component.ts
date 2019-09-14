import { Component } from '@angular/core';
import { AuthService } from './common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;

  constructor (public auth:AuthService) { 

  }

  ngOnInit () {
    // var mod = localStorage.getItem('name');
    var userId = localStorage.getItem('userId');
    console.log(userId);
    if ( userId ) {
      this.loggedIn = true;
    }
  }

}
