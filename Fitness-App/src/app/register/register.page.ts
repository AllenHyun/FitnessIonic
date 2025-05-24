import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
})
export class RegisterPage {

  private fb = inject(FormBuilder);
  private userauthService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const { name, email, password } = this.form.value;

    try {
      const userCredential = await this.userauthService.register(email, password);

      await this.userauthService.saveUserData(userCredential.user.uid, { name, email });

      this.router.navigate(['/login']);

    } catch (err) {
      console.error('Register error:', err);
    }
  }
}
