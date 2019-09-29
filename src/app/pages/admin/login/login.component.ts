import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = "";
  isValid = true;
  private userSub : Subscription;
  constructor(private usersService: UsersService, private router: Router) {}

  async loginUser(form: NgForm){
    if(form.invalid){
      return;
    }
    await this.usersService.loginUser(form.value.email, form.value.password);
    this.isValid = this.usersService.getIsAuth();
    if(!this.isValid){
      this.errorMessage = "username or password incorrect";
    }

    form.resetForm();
  }

  ngOnInit() {
    const isAuth = this.usersService.getIsAuth();
    if(isAuth){
      this.router.navigate(["/rs-admin/dashboard"]);
    }
  }
  ngOnDestroy() {
  }

}
