import {Component, NgZone, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonCard, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import {RutineLoadService} from "../services/rutine-load.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.page.html',
  styleUrls: ['./routine-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons, IonCard, IonCardHeader, IonCardTitle]
})
export class RoutineListPage implements OnInit {
  rutinas: any[] = [];

  constructor(
    private routineService: RutineLoadService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadRutines();
  }

  loadRutines() {
    this.routineService.getRutines().subscribe(data => {
      this.rutinas = data;
      this.loadImages(); // una vez cargadas las rutinas, cargar imágenes
    });
  }

  async loadImages() {
    const imageMap = await this.routineService.getAllRoutineImages();

    this.ngZone.run(() => {
      this.rutinas = this.rutinas.map(rutina => {
        const tipo = rutina.tipo;
        const imageUrl = imageMap.get(tipo) || 'assets/img/default.png';
        console.log(`→ ${rutina.name} (${tipo}): ${imageUrl}`);
        return {
          ...rutina,
          imageUrl
        };
      });
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/routine-detail', id]);
  }
}
