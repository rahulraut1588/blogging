import { Component } from '@angular/core';
import { AuthService } from '../common/auth.service';

@Component ({
    selector: 'my-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent {
    formFlag = true;
    buttonDisabled = false;
    checkEmail: any;

    constructor (public auth:AuthService) { }

    changeFlag() {
        this.formFlag = (this.formFlag) ? false : true;
    }

    loginSubmit(loginData) {
        this.auth.getLoggedIn(loginData).subscribe( (res) => {
            if ( res.stat == 200 ) {
                let userData = res.body[0];
                localStorage.setItem('userId', userData._id);
                localStorage.setItem('username', userData.username);
                localStorage.setItem('name', userData.name);
                localStorage.setItem('email', userData.email);
                window.location.reload();
            } else {
                alert("User Not Found")
            }
        });
    }

    regSubmit(regData) {
        this.auth.postUser(regData).subscribe( (res) => {
            window.location.reload();
        });
    }

    regEmailKey(event) {
        let emailData = {
            email: event.target.value
        }
        this.auth.checkEmail(emailData).subscribe( (emailCheck) => {
            this.checkEmail = emailCheck;
            if ( this.checkEmail.message == 'found' ) { 
                alert("User already Exist"); 
            }     
        });
    }

    logEmailKey(event) {
        let emailData = {
            email: event.target.value
        }
        this.auth.checkEmail(emailData).subscribe( (emailCheck) => {
            this.checkEmail = emailCheck;
            if ( this.checkEmail.message == 'found' ) { 
                this.buttonDisabled = true;
            } else {
                alert("User Dosen't Exist"); 
            }        
        });
    }
}