import { Injectable } from '@angular/core';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { registerPlugin } from '@capacitor/core';

const CapacitorSQLite = registerPlugin('CapacitorSQLite');

@Injectable({
  providedIn: 'root'
})
export class SqliteDatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDatabase(): Promise<void> {
    this.db = await this.sqlite.createConnection('favoritesDB', false, 'no-encryption', 1, false);
    await this.db.open();
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
                                             id TEXT PRIMARY KEY
      );
    `);
  }

  async addFavorite(id: string): Promise<void> {
    if (!this.db) return;
    await this.db.run('INSERT OR REPLACE INTO favorites (id) VALUES (?)', [id]);
  }

  async removeFavorite(id: string): Promise<void> {
    if (!this.db) return;
    await this.db.run('DELETE FROM favorites WHERE id = ?', [id]);
  }

  async isFavorite(id: string): Promise<boolean> {
    if (!this.db) return false;
    const result = await this.db.query('SELECT 1 FROM favorites WHERE id = ?', [id]);
    return Array.isArray(result.values) && result.values.length > 0;
  }

  async getAllFavorites(): Promise<string[]> {
    if (!this.db) return [];
    const result = await this.db.query('SELECT id FROM favorites');
    return result.values?.map(row => row.id) || [];
  }


  async closeConnection(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection('favoritesDB', false);
      this.db = null;
    }
  }
}
