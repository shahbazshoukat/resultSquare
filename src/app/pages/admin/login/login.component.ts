import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from 'lottie-web';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = '';
  isValid = true;
  isLoading = false;

  private userSub: Subscription;
  loadingAnimOptions: AnimationOptions = {
    path: '/assets/lib/loading-spinner.json'
  };

  loadingAnim: AnimationItem;

  constructor(private usersService: UsersService, private router: Router) {}

  async loginUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    await this.usersService.loginUser(form.value.email, form.value.password);
    this.isLoading = false;
    this.isValid = this.usersService.getIsAuth();
    if (!this.isValid) {
      this.errorMessage = 'username or password incorrect';
    }

    form.resetForm();
  }

  ngOnInit() {
    const isAuth = this.usersService.getIsAuth();
    if (isAuth) {
      this.router.navigate(['/rs-admin/dashboard']);
    }
  }

  loadingAnimationCreated(animationItem: AnimationItem): void {

    this.loadingAnim = animationItem;

  }

  ngOnDestroy() {
  }

}
