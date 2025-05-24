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
import {ActivatedRoute} from "@angular/router";
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
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private rutineService: RutineLoadService,
    private dbService: SqliteDatabaseService,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rutineService.getRutineById(id).subscribe(rutina => {
        this.rutina = rutina;
      });
      this.isFavorite = await this.dbService.isFavorite(id);
    }
  }

  async toggleFavorite() {
    if (!this.rutina || !this.rutina.id) return;

    if (this.isFavorite) {
      await this.dbService.removeFavorite(this.rutina.id);
    } else {
      await this.dbService.addFavorite(this.rutina.id);
    }
    this.isFavorite = !this.isFavorite;
  }
}
