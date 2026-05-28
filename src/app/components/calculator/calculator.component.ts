import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';

interface Recommendation {
  title: string;
  level: 'CRITICAL' | 'MUST HAVE' | 'RECOMMENDED';
  desc: string;
  icon: string;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  private readonly appState = inject(AppStateService);

  protected setContactTopic(topic: string): void {
    this.appState.contactTopic.set(topic);
  }

  // Betriebscheck Calculator State
  protected readonly quizStep = signal<number>(1);
  protected readonly farmType = signal<string>('Ackerbau');
  protected readonly farmSize = signal<number>(85);
  protected readonly hasEmployees = signal<boolean>(false);
  protected readonly hasSeasonal = signal<boolean>(false);
  protected readonly hasMachinery = signal<boolean>(true);
  protected readonly hasSolar = signal<boolean>(false);
  protected readonly quizResults = signal<Recommendation[]>([]);

  // Contact info within calculator
  protected readonly contactName = signal<string>('');
  protected readonly contactEmail = signal<string>('');

  constructor() {}

  protected nextQuizStep(): void {
    if (this.quizStep() < 4) {
      const nextStep = this.quizStep() + 1;
      this.quizStep.set(nextStep);
      if (nextStep === 4) {
        this.calculateRecommendations();
      }
    }
  }

  protected prevQuizStep(): void {
    if (this.quizStep() > 1) {
      this.quizStep.set(this.quizStep() - 1);
    }
  }

  protected resetQuiz(): void {
    this.quizStep.set(1);
    this.farmType.set('Ackerbau');
    this.farmSize.set(85);
    this.hasEmployees.set(false);
    this.hasSeasonal.set(false);
    this.hasMachinery.set(true);
    this.hasSolar.set(false);
    this.quizResults.set([]);
    this.contactName.set('');
    this.contactEmail.set('');
  }

  private calculateRecommendations(): void {
    const list: Recommendation[] = [];

    // Base necessity
    list.push({
      title: 'Landwirtschaftliche Betriebshaftpflicht',
      level: 'CRITICAL',
      desc: 'Existenzielle Grundabsicherung bei Personen-, Sach- und Vermögensschäden durch Ihren Betrieb, Ihre Tiere oder erzeugte Produkte.',
      icon: 'fa-shield-halved'
    });

    if (this.hasMachinery()) {
      list.push({
        title: 'Maschinen- & Schlepper-Kasko (MR-Tarif)',
        level: 'CRITICAL',
        desc: 'Schützt Ihren wertvollen Maschinenpark (Traktoren, Mähdrescher, Anbaugeräte) bei Unfällen, Diebstahl, Brand oder Bedienfehlern.',
        icon: 'fa-tractor'
      });
    }

    if (this.hasSeasonal()) {
      list.push({
        title: 'AgrarOptimal Erntehelfer-Versicherung',
        level: 'CRITICAL',
        desc: 'Maßgeschneiderte Kranken-, Unfall- und Haftpflichtversicherung für Ihre ausländischen Saisonarbeitskräfte zu exklusiven Tarifen.',
        icon: 'fa-users'
      });
    }

    if (this.hasSolar()) {
      list.push({
        title: 'Photovoltaik- & Ertragsausfallversicherung',
        level: 'MUST HAVE',
        desc: 'Deckt Schäden an Ihrer Solaranlage durch Sturm, Hagel oder Überspannung und ersetzt den finanziellen Ertragsausfall bei Netzunterbrechung.',
        icon: 'fa-solar-panel'
      });
    }

    if (this.farmType() === 'Weinbau' || this.farmType() === 'Ackerbau') {
      list.push({
        title: 'Ernteausfall- & Hagelversicherung',
        level: 'RECOMMENDED',
        desc: 'Sichert Ihre Ernten auf dem Feld oder im Weinberg gegen extreme Wettereinflüsse (Hagel, Starkregen, Frost, Dürre).',
        icon: 'fa-cloud-showers-heavy'
      });
    }

    if (this.hasEmployees()) {
      list.push({
        title: 'Gruppen-Unfallversicherung für Mitarbeiter',
        level: 'RECOMMENDED',
        desc: 'Hochwertiger Rund-um-die-Uhr-Schutz für Ihre Beschäftigten. Steigert Ihre Attraktivität als moderner Arbeitgeber.',
        icon: 'fa-user-shield'
      });
    } else {
      list.push({
        title: 'Landwirtschaftliche Unfallversicherung (Familie)',
        level: 'MUST HAVE',
        desc: 'Sichert Sie als Betriebsleiter und Ihre mithelfenden Familienmitglieder bei schweren Arbeits- und Freizeitunfällen finanziell ab.',
        icon: 'fa-heart-pulse'
      });
    }

    list.push({
      title: 'Agrar- & Verkehrs-Rechtsschutz',
      level: 'RECOMMENDED',
      desc: 'Schützt Sie vor hohen Prozesskosten bei Streitigkeiten um Pachtverträge, Umweltauflagen, Subventionen oder Nachbarschaftsrecht.',
      icon: 'fa-scale-balanced'
    });

    this.quizResults.set(list);
  }
}
