import { Injectable } from '@angular/core';
import errors from '../utils/errorCodes';

@Injectable({
  providedIn: 'root'
})

export class FormErrorsService {

  constructor() { }

  getErrorMessage(input: string, controlNames: object) {
    let errorsAux: any;
    if (controlNames[input]) errorsAux = controlNames[input].errors;
    if (errorsAux) {
      const keys = Object.keys(controlNames[input].errors);
      if (!keys || keys.length === 0) return '';
      return errors[Object.keys(controlNames[input].errors)[0]];
    } else {
      return '';
    }
  }
}
