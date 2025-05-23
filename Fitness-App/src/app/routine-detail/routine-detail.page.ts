import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton, IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RutineLoadService} from "../services/rutine-load.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SqliteDatabaseService} from "../services/sqlite-database.service";

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.page.html',
  styleUrls: ['./routine-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonBackButton, IonButtons, IonButton]
})
export class RoutineDetailPage implements OnInit {
  rutina: any;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: RutineLoadService,
    private dbService: SqliteDatabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.firebaseService.getRutineById(id).subscribe(data => {
        this.rutina = data;
      });
    }
    if (this.rutina?.id) {
      this.dbService.isFavorite(this.rutina.id).then(fav => {
        this.isFavorite = fav ?? false;
      });
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.dbService.removeFavorite(this.rutina.id);
    } else {
      this.dbService.addFavorite(this.rutina.id);
    }
    this.isFavorite = !this.isFavorite;
  }
}
