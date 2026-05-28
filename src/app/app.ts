import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Office {
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  top: number;
  left: number;
  desc: string;
}

interface Recommendation {
  title: string;
  level: 'CRITICAL' | 'MUST HAVE' | 'RECOMMENDED';
  desc: string;
  icon: string;
}

interface Job {
  title: string;
  location: string;
  type: string;
  desc: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Navigation & Tabs
  protected readonly activeTab = signal<string>('landwirtschaft');
  protected readonly selectedOffice = signal<Office | null>(null);
  protected readonly isMobileMenuOpen = signal<boolean>(false);

  // Betriebscheck Quiz State
  protected readonly quizStep = signal<number>(1);
  protected readonly farmType = signal<string>('Ackerbau');
  protected readonly farmSize = signal<number>(85);
  protected readonly hasEmployees = signal<boolean>(false);
  protected readonly hasSeasonal = signal<boolean>(false);
  protected readonly hasMachinery = signal<boolean>(true);
  protected readonly hasSolar = signal<boolean>(false);
  protected readonly quizResults = signal<Recommendation[]>([]);

  // Contact Form State
  protected readonly contactName = signal<string>('');
  protected readonly contactEmail = signal<string>('');
  protected readonly contactPhone = signal<string>('');
  protected readonly contactTopic = signal<string>('allgemein');
  protected readonly contactMessage = signal<string>('');
  protected readonly formSubmitted = signal<boolean>(false);

  // Active Job Details Popup
  protected readonly selectedJob = signal<Job | null>(null);

  // Data Lists
  protected readonly offices: Office[] = [
    {
      name: 'MRVV GmbH & Co. KG Wismar',
      city: 'Wismar',
      address: 'Spiegelberg 57, 23966 Wismar',
      phone: '03841-468570',
      email: 'info@mrvv-deutschland.de',
      top: 20, left: 56,
      desc: 'Hauptsitz Nord mit erstklassiger Betreuung für Betriebe im Norden.'
    },
    {
      name: 'MRVV GmbH Niederlassung Nienborstel',
      city: 'Nienborstel',
      address: 'Dorfstraße 14 a, 24819 Nienborstel',
      phone: '04875-269940',
      email: 'info@mrvv-deutschland.de',
      top: 15, left: 38,
      desc: 'Unser agrarischer Beratungsschwerpunkt in Schleswig-Holstein.'
    },
    {
      name: 'MRVV Rheinland-Pfalz/Saarland GmbH & Co. KG',
      city: 'Alzey',
      address: 'Otto-Lilienthal-Str. 4, 55232 Alzey',
      phone: '06731-8999074',
      email: 'info@maschinenringe-rlp.de',
      top: 67, left: 23,
      desc: 'Spezialisten für Weinbau, Ackerbau und Sonderkulturen.'
    },
    {
      name: 'MRVV Baden-Württemberg GmbH & Co. KG',
      city: 'Stuttgart',
      address: 'Olgastraße 111, 70180 Stuttgart',
      phone: '0711-9533770',
      email: 'info@mrvv-deutschland.de',
      top: 79, left: 36,
      desc: 'Ihr starker Partner für die Landwirtschaft in Baden-Württemberg.'
    },
    {
      name: 'Versicherungsbüro Hinmüller GmbH & Co. KG',
      city: 'Mettenheim',
      address: 'Ampfingerstr. 29, 84562 Mettenheim',
      phone: '08631 14178',
      email: 'info@versicherungsbuero-hinmueller.com',
      top: 86, left: 68,
      desc: 'Familiengeführtes Partnerbüro mit breiter Expertise im bayerischen Alpenvorland.'
    },
    {
      name: 'Wallis & Hühsam GmbH & Co. KG',
      city: 'Hersbruck',
      address: 'Nürnberger Str. 5, 91217 Hersbruck',
      phone: '09151-908480',
      email: 'info@wallis-huehsam.de',
      top: 72, left: 64,
      desc: 'Erfahrener Versicherungspartner für Hersbruck und Umgebung.'
    },
    {
      name: 'Wallis & Hühsam GmbH & Co. KG',
      city: 'Prichsenstadt',
      address: 'Bimbach 36, 97357 Prichsenstadt',
      phone: '09151-908480',
      email: 'info@wallis-huehsam.de',
      top: 69, left: 55,
      desc: 'Kompetente Absicherung für fränkische landwirtschaftliche Betriebe direkt vor Ort.'
    }
  ];

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

  // Lifecycle constructor
  constructor() {
    // Select first office by default
    this.selectedOffice.set(this.offices[0]);
  }

  // Quiz Navigation & Business Logic
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

  // Interactive Map Actions
  protected selectOffice(office: Office): void {
    this.selectedOffice.set(office);
  }

  // Mobile drawer controls
  protected toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  protected closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  // Submit contact form
  protected submitContactForm(event: Event): void {
    event.preventDefault();
    if (this.contactName() && this.contactEmail()) {
      this.formSubmitted.set(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        this.formSubmitted.set(false);
        this.contactName.set('');
        this.contactEmail.set('');
        this.contactPhone.set('');
        this.contactTopic.set('allgemein');
        this.contactMessage.set('');
      }, 5000);
    }
  }

  // Careers Popup Action
  protected openJobDetails(job: Job): void {
    this.selectedJob.set(job);
  }

  protected closeJobDetails(): void {
    this.selectedJob.set(null);
  }
}
