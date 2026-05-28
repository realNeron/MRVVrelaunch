import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  title: string;
  location: string;
  type: string;
  desc: string;
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css'
})
export class CareersComponent {
  protected readonly selectedJob = signal<Job | null>(null);

  protected readonly jobs: Job[] = [
    {
      title: 'Versicherungsfachkraft (m/w/d) - KFZ-Schwerpunkt',
      location: 'Nortmoor / Wismar',
      type: 'Vollzeit oder Teilzeit',
      desc: 'Eigenverantwortliche Betreuung und Abwicklung von KFZ-Versicherungen für unsere landwirtschaftlichen Kunden. Sie beraten unsere Maschinenring-Mitglieder bei Neuverträgen, Tarifumstellungen und Schadensfällen.'
    },
    {
      title: 'Kundenbetreuer (m/w/d) im Außendienst',
      location: 'Raum Mühldorf am Inn / Landshut',
      type: 'Vollzeit',
      desc: 'Persönliche Betreuung unserer bestehenden landwirtschaftlichen Mitglieder und Akquise neuer Partnerschaften. Sie agieren als Bindeglied zwischen den örtlichen Maschinenringen und den landwirtschaftlichen Betrieben.'
    },
    {
      title: 'Auszubildende/r zum Kaufmann für Versicherungen (m/w/d)',
      location: 'Northeim / Leinetal',
      type: 'Ausbildung',
      desc: 'Praxisnahe Ausbildung in einem wachsenden, krisensicheren Spezialmaklerbetrieb für die moderne Landwirtschaft. Sie lernen alle Facetten der Agrar- und Privatversicherungen von der Pike auf kennen.'
    },
    {
      title: 'Kundenbetreuer (m/w/d) für landw. Betriebe & Familien',
      location: 'Baden-Württemberg',
      type: 'Vollzeit',
      desc: 'Ganzheitliche Beratung von Agrarbetrieben, Winzern und deren Familien direkt vor Ort auf den Höfen. Sie erstellen maßgeschneiderte Deckungskonzepte zur Absicherung des Betriebs und der Familie.'
    }
  ];

  constructor() {}

  protected openJobDetails(job: Job): void {
    this.selectedJob.set(job);
  }

  protected closeJobDetails(): void {
    this.selectedJob.set(null);
  }
}
