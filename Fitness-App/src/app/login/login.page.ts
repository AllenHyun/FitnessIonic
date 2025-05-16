import {Component, inject, OnInit, ProviderToken} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel, IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import * as console from "node:console";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonButton, IonInput, IonItem, ReactiveFormsModule, IonList]
})
export class LoginPage{

  private fb = inject(FormBuilder);
  private UserAuthService: ProviderToken<unknown>;
  private authService = inject(this.UserAuthService);
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
      await this.authService.register(email, password);
      this.router.navigate(['/']);

    } catch (err) {
      console.error('Register error:', err);
    }
  }



}
