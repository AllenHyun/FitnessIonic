import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {Firestore, getDoc, getDocs} from '@angular/fire/firestore';
import {collection, collectionData, doc, docData} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class RutineLoadService {
  constructor(private firestore: Firestore) {}

  getRutines(): Observable<any[]> {
    const rutinasRef = collection(this.firestore, 'rutinas');
    return collectionData(rutinasRef, { idField: 'id' }) as Observable<any[]>;
  }

  getRutineById(id: string): Observable<any> {
    const rutinaDoc = doc(this.firestore, `rutinas/${id}`);
    return docData(rutinaDoc, { idField: 'id' });
  }

  getAllRoutineImages(): Promise<Map<string, string>> {
    const ref = collection(this.firestore, 'routines_images');

    return getDocs(ref).then(snapshot => {
      const map = new Map<string, string>();

      snapshot.forEach(doc => {
        const data = doc.data();
        Object.entries(data).forEach(([tipo, url]) => {
          if (typeof url === 'string') {
            map.set(tipo, url);
          }
        });
      });

      return map;
    });
  }
}
