import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

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

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  private readonly appState = inject(AppStateService);

  protected readonly selectedOffice = signal<Office | null>(null);

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
      name: 'MRVV GmbH & Co. KG Nortmoor',
      city: 'Nortmoor',
      address: 'Gewerbestr. 2, 26845 Nortmoor',
      phone: '04950-9955869',
      email: 'nortmoor@mrvv-deutschland.de',
      top: 26, left: 18,
      desc: 'Unsere Geschäftsstelle in Ostfriesland – verlässlicher Partner für landwirtschaftliche Betriebe und Maschinenringe im Nordwesten.'
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

  constructor() {
    this.selectedOffice.set(this.offices[0]);
  }

  protected selectOffice(office: Office): void {
    this.selectedOffice.set(office);
  }

  protected setContactTopic(topic: string): void {
    this.appState.contactTopic.set(topic);
  }
}
