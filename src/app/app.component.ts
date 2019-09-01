import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'public';
  formFlag: boolean = false;

  changeFlag() {
    this.formFlag = (this.formFlag) ? false : true;
    console.log(this.formFlag);
  }

  loginSubmit(loginData) {
    console.log(loginData);
  }

  regSubmit(regData) {
    console.log(regData);
  }
}
