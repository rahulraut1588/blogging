import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable ()

export class AuthService {

    listData: any; 
    userData:any;
    specificUserId:any;
    loggedInUser: any;

    constructor(private http:HttpClient) { }

    options = { 
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
    }

    getLoggedIn (formData):Observable<any> {
        formData = JSON.stringify(formData);
        this.loggedInUser  = this.http.post('http://localhost:8000/api/login', formData, this.options);
        return this.loggedInUser;
    }

    checkEmail(email) {
        email = JSON.stringify(email);
        let checkedEmail  = this.http.post('http://localhost:8000/api/users', email, this.options);
        return checkedEmail;
    }

    postUser (formData: any):Observable<any> {
        formData = JSON.stringify(formData);
        this.userData  = this.http.post('http://localhost:8000/api/adduser', formData, this.options);
        return this.userData;
    }

}