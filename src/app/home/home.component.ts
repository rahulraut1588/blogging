import { Component } from '@angular/core';

@Component ({
    selector: 'my-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    
    logoutButton() {
        localStorage.setItem('userId', '');
        localStorage.setItem('name', '');
        localStorage.setItem('email', '');
        window.location.reload();
    }

}
