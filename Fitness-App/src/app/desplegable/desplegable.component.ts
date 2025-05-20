import {Component} from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {NgIf} from "@angular/common";
import {User} from "@angular/fire/auth";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Capacitor} from "@capacitor/core";
import {StatusBar, Style} from "@capacitor/status-bar";

@Component({
  selector: 'app-desplegable',
  templateUrl: 'desplegable.component.html',
  styleUrls: ['desplegable.component.scss'],
  imports: [IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonList, IonMenuToggle, IonItem, NgIf, RouterLink],
  standalone: true
})
export class DesplegableComponent {
  user: User | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    if(Capacitor.getPlatform() !== 'web'){
      StatusBar.setOverlaysWebView({overlay: false});
      StatusBar.setStyle({style: Style.Light});
    }

    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }
  get currentRoute(): string {
    return this.router.url;
}
}
