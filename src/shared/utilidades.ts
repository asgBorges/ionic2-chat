import { Injectable } from '@angular/core';

@Injectable()
export class UtilidadesService {
    public objToArray(Obj) {
      return Object.keys(Obj).map(key => {
        if (!Obj[key].$key) { Obj[key].$key = key; }
        return Obj[key]; 
      })
    }
}  