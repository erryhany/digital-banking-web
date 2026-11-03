import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(private fb: FormBuilder,private authservice: AuthService,private  router : Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authservice.login(username, pwd).subscribe({
      next: (result) => {
        this.authservice.loadProfile(result);
        this.router.navigateByUrl("/admin");
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
