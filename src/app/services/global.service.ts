import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  inicializarCampos<T extends Record<string, any>>(obj: T): T {
    const defaultValueMap: Record<string, any> = {
      string: "",
      number: -1,
      boolean: false,
    };

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fieldType = typeof obj[key];
        obj[key] = defaultValueMap[fieldType];
      }
    }

    return obj;
  }
}
