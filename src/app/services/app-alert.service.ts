import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AppAlertService {
  alertEvent = new Subject<{state: string, type: string, message: string}>();
  constructor() { }

}
