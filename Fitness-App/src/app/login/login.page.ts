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
  imports: [IonicModule, ReactiveFormsModule]
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private userauthService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;

  constructor() {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const { email, password } = this.form.value;

    try {
      await this.userauthService.register(email, password);
      this.router.navigate(['/']);

    } catch (err) {
      console.error('Register error:', err);
    }
  }


}
