import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {SqliteDatabaseService} from "./services/sqlite-database.service";
import { DesplegableComponent} from "./desplegable/desplegable.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, DesplegableComponent],
  standalone: true
})
export class AppComponent {
  constructor(private db: SqliteDatabaseService) {
    this.db.initDatabase();
  }


}
