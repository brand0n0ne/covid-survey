import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Respuestas from './fbModel';

@Injectable({
  providedIn: 'root'
})
export class GlobalSurveyervice {

  private dbPath = '/GlobalSurvey';

  GlobalSurveyRef: AngularFireList<Respuestas>;

  constructor(private db: AngularFireDatabase) {
    this.GlobalSurveyRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Respuestas> {
    return this.GlobalSurveyRef;
  }

  create(tutorial: Respuestas): any {
    return this.GlobalSurveyRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.GlobalSurveyRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.GlobalSurveyRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.GlobalSurveyRef.remove();
  }
}