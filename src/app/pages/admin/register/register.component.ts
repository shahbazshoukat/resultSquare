import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nameValid = false;
  emailValid = false;
  passwordValid = false;
  formStatus = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  addUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.formStatus = true;
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (form.value.name == "") {
      this.nameValid = false;
    } else {
      this.nameValid = true;
    }
    if (form.value.email == "" ) {
      this.emailValid = false;
    }else if(!regexp.test(form.value.email)){
      this.emailValid = false;
    }else {
      this.emailValid = true;
    }
    if (form.value.password == "" || form.value.password.length < 6) {
      this.passwordValid = false;
    } else {
      this.passwordValid = true;
    }
    if (this.nameValid && this.emailValid && this.passwordValid) {
      this.usersService.addUser(
        form.value.name,
        form.value.email,
        form.value.password
      );
    }else{
      return;
    }

    form.resetForm();
    this.formStatus = false;
  }
}
