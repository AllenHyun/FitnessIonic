import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent, IonHeader,
  IonMenuButton,
  IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {SqliteDatabaseService} from "../services/sqlite-database.service";
import {Router} from "@angular/router";
import {RutineLoadService} from "../services/rutine-load.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [
    IonCard,
    IonContent,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonHeader,
    IonToolbar
  ]
})
export class FavoritesComponent  implements OnInit {

  favoritas: any[] = [];

  constructor(
    private rutinaService: RutineLoadService,
    private dbService: SqliteDatabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    const ids = await this.dbService.getAllFavorites();

    const rutinas = await Promise.all(
      ids.map(id => this.rutinaService.getRutineById(id).toPromise())
    );


    const imageMap = await this.rutinaService.getAllRoutineImages();
    this.favoritas = rutinas.map(rutina => ({
      ...rutina,
      imageUrl: imageMap.get(rutina.tipo) || 'assets/img/default.png'
    }));
  }

  goToDetail(id: string) {
    this.router.navigate(['/routine-detail', id]);
  }
}
