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
  AlertController, IonButton,
} from '@ionic/angular/standalone';
import {NgIf} from "@angular/common";
import {User} from "@angular/fire/auth";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Capacitor} from "@capacitor/core";
import {StatusBar, Style} from "@capacitor/status-bar";
import {filter} from "rxjs";

import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-desplegable',
  templateUrl: 'desplegable.component.html',
  styleUrls: ['desplegable.component.scss'],
  imports: [
    IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar,
    IonList, IonMenuToggle, IonItem, NgIf, RouterLink, IonButton
  ],
  standalone: true
})
export class DesplegableComponent {
  user: User | null = null;
  pageTitle: string = 'Menu';
  userName: string | null = null;
  userDocId: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private alertController: AlertController,
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
          this.userDocId = querySnapshot.docs[0].id;
        } else {
          this.userName = null;
          this.userDocId = null;
        }
      } else {
        this.userName = null;
        this.userDocId = null;
      }
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.pageTitle = this.getPageTitle(this.router.url);
      });
  }

  async presentEditNamePrompt() {
    if (!this.userName) {
      this.userName = '';
    }

    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name',
          value: this.userName
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: async (data) => {
            if (data.name && data.name.trim().length > 0) {
              await this.updateUserName(data.name.trim());
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async updateUserName(newName: string) {
    if (!this.userDocId) return;

    const userDocRef = doc(this.firestore, 'users', this.userDocId);
    try {
      await updateDoc(userDocRef, { name: newName });
      this.userName = newName;
    } catch (error) {
      console.error('Error updating name:', error);
    }
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
