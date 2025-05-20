import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton, IonButtons,
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

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.page.html',
  styleUrls: ['./routine-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonBackButton, IonButtons]
})
export class RoutineDetailPage implements OnInit {
  rutina: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: RutineLoadService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.firebaseService.getRutineById(id).subscribe(data => {
        this.rutina = data;
      });
    }
  }
}
