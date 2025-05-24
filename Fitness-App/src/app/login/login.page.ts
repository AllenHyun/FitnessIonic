import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage  {

  private fb = inject(FormBuilder);
  private userauthService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;

  constructor() {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    const { email, password } = this.form.value;

    try {
      await this.userauthService.login(email, password);
      this.router.navigate(['routine-list']);

    } catch (err) {
      console.error('Login error:', err);
    }
  }

}
