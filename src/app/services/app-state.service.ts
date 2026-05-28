import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Shared signal to pass the selected contact topic between MapComponent and ContactComponent
  public readonly contactTopic = signal<string>('allgemein');

  constructor() {}
}
