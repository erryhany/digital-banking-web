import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated : boolean = false;
  roles: any;
  username : any;
  accessToken : string = "";

  constructor(private http: HttpClient) {  }
  public login(username:string, password:string) {
    let options={
      headers:new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }
    let params = new HttpParams().set("username", username).set("password", password);
    return this.http.post(environment.backendHost+"/auth/login",params,options)
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = "";
    this.username = undefined;
    this.roles = undefined;
  }

  loadProfile(data : any) {
    this.isAuthenticated = true;
    this.accessToken =data['access_token'];
    let decodedJwt:any=jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;

  }
}
