import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EmitterService {

  private static heatMap: { [heatMapList: string]: EventEmitter<any> } = {};

  static setheatMap(heatMapList: string): EventEmitter<any> {
    if (!this.heatMap[heatMapList]) {
      this.heatMap[heatMapList] = new EventEmitter();
    }
    return this.heatMap[heatMapList];
  }
}
