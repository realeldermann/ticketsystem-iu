import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMsg: string = '';

  constructor(private router: Router, private userService: UsersService) { 
    if(this.userService.isLoggedIn()) this.router.navigateByUrl('home');
  }

  ngOnInit(): void {
  }
  async login() {
    console.log(this.email, this.password);
    try {
      await this.userService.login(this.email, this.password);
      this.router.navigateByUrl('/');
    } catch(err) {
      console.log('Login failed:', err);
      if(typeof err === 'string') this.errorMsg = err;
    }
  }
}
