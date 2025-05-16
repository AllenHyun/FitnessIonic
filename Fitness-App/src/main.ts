import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getAuth, provideAuth} from "@angular/fire/auth";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({ projectId: "fitness-app-9ff3b", appId: "1:413264381975:web:94b5d200ea4909c20d3452", storageBucket: "fitness-app-9ff3b.firebasestorage.app", apiKey: "AIzaSyDboHLi3Vl-xgoEGRgh0NmWwBSopasL1Wc", authDomain: "fitness-app-9ff3b.firebaseapp.com", messagingSenderId: "413264381975" })), provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
});
