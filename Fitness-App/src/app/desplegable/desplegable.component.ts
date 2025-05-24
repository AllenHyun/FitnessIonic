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
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Capacitor} from "@capacitor/core";
import {StatusBar, Style} from "@capacitor/status-bar";
import {filter} from "rxjs";

import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-desplegable',
  templateUrl: 'desplegable.component.html',
  styleUrls: ['desplegable.component.scss'],
  imports: [IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonList, IonMenuToggle, IonItem, NgIf, RouterLink],
  standalone: true
})
export class DesplegableComponent {
  user: User | null = null;
  pageTitle: string = 'Menu';
  userName: string | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
  ) {
    if(Capacitor.getPlatform() !== 'web'){
      StatusBar.setOverlaysWebView({overlay: false});
      StatusBar.setStyle({style: Style.Light});
    }

    this.authService.currentUser.subscribe(async user => {
      this.user = user;
      if(user?.email){
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        if(!querySnapshot.empty){
          this.userName = querySnapshot.docs[0].data()['name'] || null;
        } else {
          this.userName = null;
        }
      } else {
        this.userName = null;
      }
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle = this.getPageTitle(this.router.url);
      });
  }

  get currentRoute(): string {
    return this.router.url;
  }

  private getPageTitle(url: string): string {
    switch (url) {
      case '/home': return 'Home';
      case '/login': return 'Login';
      case '/register': return 'Register';
      case '/favorites': return 'Favorites';
      default: return 'Menu';
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
