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

interface Representative {
  name: string;
  role: string;
  phone: string;
  mobile?: string;
  email: string;
  photo: string;
  officeCity: string;
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
      desc: 'Unser Beratungsschwerpunkt für Landwirtschaft in Schleswig-Holstein.'
    },
    {
      name: 'MRVV GmbH & Co. KG Nortmoor',
      city: 'Nortmoor',
      address: 'Gewerbestr. 2, 26845 Nortmoor',
      phone: '04950-9955869',
      email: 'nortmoor@mrvv-deutschland.de',
      top: 27, left: 17,
      desc: 'Unsere Geschäftsstelle in Ostfriesland – verlässlicher Partner für landwirtschaftliche Betriebe und Maschinenringe im Nordwesten.'
    },
    {
      name: 'MRVV GmbH & Co. KG Wismar',
      city: 'Wiesmoor',
      address: 'Oldenburger Str. 36, 26639 Wiesmoor',
      phone: '04950-9955879',
      email: 'wiesmoor@mrvv-deutschland.de',
      top: 22, left: 20,
      desc: 'Unsere Außenstelle Wiesmoor – kompetente Absicherung und neutrale Beratung für den Maschinenring Nordwest.'
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
    },
    {
      name: 'MRVV Büro Nordhorn',
      city: 'Nordhorn',
      address: 'Stadtring 24, 48527 Nordhorn',
      phone: '05921-8193356',
      email: 'haack@g-v-k.de',
      top: 36, left: 16,
      desc: 'Ihr regionaler Ansprechpartner für den Maschinenring Steinfurt-Bentheim e.V. direkt vor Ort in Nordhorn.'
    },
    {
      name: 'MRVV Büro Northeim',
      city: 'Northeim',
      address: 'Lange Lage 9, 37154 Northeim',
      phone: '0160-99537198',
      email: 'rehmann@mrvv-deutschland.de',
      top: 44, left: 44,
      desc: 'Ihr persönlicher Ansprechpartner für den Maschinenring Leinetal und den Maschinenring Harz-Weser in Northeim und Umgebung.'
    },
    {
      name: 'MRVV Büro Neuburg',
      city: 'Neuburg',
      address: 'Schulstraße 12, 86697 Oberhausen',
      phone: '08431-5365435',
      email: 'vonfelbert@mrvv-deutschland.de',
      top: 81, left: 57,
      desc: 'Stephan von Felbert (Koordinator Süd) – Ihr Experte für landwirtschaftliche Risikobewertung und Versicherungsschutz.'
    },
    {
      name: 'MRVV Büro Merseburg',
      city: 'Merseburg',
      address: 'Poststraße 14, 06217 Merseburg',
      phone: '03461-212162',
      email: 'buero@mr-merseburgerland.de',
      top: 47, left: 63,
      desc: 'Ihr Ansprechpartner beim Maschinenring Merseburger Land e.V. – kompetente Betreuung und Absicherung für landwirtschaftliche Betriebe.'
    }
  ];

  protected readonly representatives: Representative[] = [
    {
      name: 'Jörg Triebke',
      role: 'Geschäftsführer',
      phone: '0381-20278711',
      email: 'triebke@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Triebke_Joerg.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Stefan Paus',
      role: 'Geschäftsführer',
      phone: '03841-4685710',
      email: 'paus@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Paus_Stefan.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Stefan Danker',
      role: 'Vertriebsleiter',
      phone: '03841-4685713',
      mobile: '0151-46387807',
      email: 'danker@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/DSC01067_2_pp__Stefan_Danker.jpg',
      officeCity: 'Wismar'
    },
    {
      name: 'Wenzel Gudde',
      role: 'Außendienst',
      phone: '03841-4685717',
      mobile: '0171-3026199',
      email: 'gudde@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Gudde_Wenzel_01.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Julius Stepbach',
      role: 'Außendienst',
      phone: '04163-814218',
      mobile: '0151-18660439',
      email: 'stepbach@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Stepbach_Julius.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Ernesto Dastschi',
      role: 'Außendienst',
      phone: '05841-9628160',
      mobile: '0171-5681501',
      email: 'dastschi@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Ernesto_Dastschi_300px.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Rouven Lars Rehmann',
      role: 'Außendienst',
      phone: '0160-99537198',
      email: 'rehmann@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Rouven-Lars_Rehmann_klein_01.jpg',
      officeCity: 'Northeim'
    },
    {
      name: 'Thomas Haack',
      role: 'Außendienst',
      phone: '05921-8193356',
      mobile: '0174-9889263',
      email: 'haack@g-v-k.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/dummy-m_02.png',
      officeCity: 'Nordhorn'
    },
    {
      name: 'Stephan von Felbert',
      role: 'Koordinator Süd',
      phone: '08431-5365435',
      mobile: '0171-3384744',
      email: 'vonfelbert@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/von_Felbert_Stephan.png',
      officeCity: 'Neuburg'
    },
    {
      name: 'Herbert Saathoff',
      role: 'Außendienst',
      phone: '04950-9955878',
      email: 'saathoff@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Saathoff_Herbert.png',
      officeCity: 'Nortmoor'
    },
    {
      name: 'Thomas Eiken',
      role: 'Außendienst',
      phone: '04950-9877964',
      mobile: '0160-94957808',
      email: 'nortmoor@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Thomas_Eiken_350x350_01.jpeg',
      officeCity: 'Nortmoor'
    },
    {
      name: 'Heinz-B. Swart',
      role: 'Außendienst',
      phone: '04944-9219011',
      mobile: '0175-6245764',
      email: 'wiesmoor@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Heinz_Swart_350x350_01.jpeg',
      officeCity: 'Wiesmoor'
    },
    {
      name: 'Heike Hellmers',
      role: 'Sachbearbeitung',
      phone: '04944-9219012',
      email: 'wiesmoor@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Heike_Hellmers_350x350_01.jpg',
      officeCity: 'Wiesmoor'
    },
    {
      name: 'Hansjörg Weber',
      role: 'Geschäftsführer',
      phone: '0711-95337771',
      email: 'hansjoerg.weber@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/hansjoerg-weber.png',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Jens-Uwe Rohwer',
      role: 'Geschäftsführer',
      phone: '0172-4100970',
      email: 'jens-uwe.rohwer@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Rohwer_2020_Neu_04.png',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Marc Lutkat',
      role: 'Vertriebsleiter & Außendienst',
      phone: '07345-969128',
      mobile: '0152-01949407',
      email: 'marc.lutkat@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Marc_Lutkat_300px_02.png',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Manfred Walz',
      role: 'Außendienst',
      phone: '07032-7995110',
      mobile: '0152-33620603',
      email: 'manfred.walz@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Manfred_Walz_klein.jpg',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Adis Cerimovic',
      role: 'Außendienst',
      phone: '0176-73861095',
      email: 'adis.cerimovic@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Adis_Cerimovic_klein_01.jpg',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Katja Kürner',
      role: 'Außendienst',
      phone: '0155-61414015',
      email: 'katja.kuerner@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Katja_kuerner.jpg',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Heike Lutkat',
      role: 'Vertriebsunterstützung',
      phone: '03841-4685723',
      email: 'heike.lutkat@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/lutkat-heike_6.jpg',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Burkhard Steinebrunner',
      role: 'Außendienst',
      phone: '0159-06249844',
      mobile: '0171-3637936',
      email: 'burkhard.steinebrunner@mrvv-bw.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Steinebrunner_Burkhard_01.jpg',
      officeCity: 'Stuttgart'
    },
    {
      name: 'Stefan Ernst',
      role: 'Geschäftsführer',
      phone: '06731-8999074',
      email: 'info@maschinenringe-rlp.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/dummy-m_05.png',
      officeCity: 'Alzey'
    },
    {
      name: 'Jens-Uwe Rohwer',
      role: 'Geschäftsführer',
      phone: '0172-4100970',
      email: 'jens-uwe.rohwer@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Rohwer_2020_Neu_05.png',
      officeCity: 'Alzey'
    },
    {
      name: 'Stefan Neyses',
      role: 'Außendienst',
      phone: '06561-4952',
      mobile: '0172-6112549',
      email: 'neyses@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Neyses_Stefan.png',
      officeCity: 'Alzey'
    },
    {
      name: 'Torsten Graßmann',
      role: 'Außendienst',
      phone: '0152-34034542',
      email: 'grassmann@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Torsten_Grassmann_klein.jpg',
      officeCity: 'Alzey'
    },
    {
      name: 'Stephan Bumberger',
      role: 'Außendienst',
      phone: '0179-4243603',
      email: 'bumberger@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/dummy-m.png',
      officeCity: 'Alzey'
    },
    {
      name: 'Beate Zielke',
      role: 'Sachbearbeitung',
      phone: '03841-4685711',
      email: 'zielke@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Zielke_Beate_01.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Mandy Waschtowitz',
      role: 'Sachbearbeitung',
      phone: '03841-4685721',
      email: 'waschtowitz@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Mandy_Waschtowitz.jpg',
      officeCity: 'Wismar'
    },
    {
      name: 'Sonja Scholz-Götting',
      role: 'Sachbearbeitung',
      phone: '03841-4685715',
      email: 'scholz-goetting@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Scholz_Sonja.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Gildeliza Donnerhak-Montero',
      role: 'Sachbearbeitung',
      phone: '03841-4685722',
      email: 'donnerhak-montero@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Gildeliza_Donnerhak-Montero_03.jpg',
      officeCity: 'Wismar'
    },
    {
      name: 'Tino Krambeer',
      role: 'Sachbearbeitung',
      phone: '03841-4685712',
      email: 'krambeer@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Krambeer_Tino.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Laura Neubauer',
      role: 'Sachbearbeitung',
      phone: '03841-4685718',
      email: 'neubauer@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Laura_Neubauer.jpg',
      officeCity: 'Wismar'
    },
    {
      name: 'Viktoriia Muzhyla',
      role: 'Sachbearbeitung',
      phone: '03841-4685720',
      email: 'muzhyla@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Viktoriia_Muzhyla.jpg',
      officeCity: 'Wismar'
    },
    {
      name: 'Mattis Busch',
      role: 'EDV & IT-Support',
      phone: '03841-4685719',
      email: 'busch@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Mattis_Busch.png',
      officeCity: 'Wismar'
    },
    {
      name: 'Otto Festersen',
      role: 'Geschäftsführer Pro Agrar GmbH',
      phone: '04875-2699413',
      mobile: '0172-4264887',
      email: 'o.festersen@mrvv.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Festersen_Otto.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Ove Jochimsen',
      role: 'Außendienst Pro Agrar GmbH',
      phone: '04875-2699416',
      mobile: '0152-03367814',
      email: 'o.jochimsen@mrvv.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Jochimsen_Ove.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Anke Detlefsen',
      role: 'Vertrieb OVME GmbH',
      phone: '04351-767923',
      mobile: '0151-54215879',
      email: 'a.detlefsen@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Detlefsen_Anke.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Karsten Weilandt',
      role: 'Außendienst Pro Agrar GmbH',
      phone: '04875-2699415',
      mobile: '0151-52722577',
      email: 'k.weilandt@mrvv.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Weilandt_Karsten.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Levke Koep',
      role: 'Außendienst Pro Agrar GmbH',
      phone: '04875-2699415',
      mobile: '0172-5778273',
      email: 'l.koep@mrvv.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Koep_Levke.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Bertram Drope',
      role: 'Außendienst MR Harburg',
      phone: '04181-217575',
      mobile: '01525-3607930',
      email: 'drope@mr-harburg.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/Drope_Bertram.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Jörn Breiholz',
      role: 'Außendienst Pro Agrar GmbH',
      phone: '04875-2699410',
      mobile: '0173-3976039',
      email: 'j.breiholz@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/dummy-m_12.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Sibylle Krieger',
      role: 'Sachbearbeitung',
      phone: '04875-2699418',
      email: 's.krieger@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/dummy-w_01.png',
      officeCity: 'Nienborstel'
    },
    {
      name: 'Jutta Holst',
      role: 'Sachbearbeitung',
      phone: '04875-2699420',
      email: 'j.holst@mrvv-deutschland.de',
      photo: 'https://www.mrvv.de/fileadmin/Fileuploads/user_upload/team/dummy-w_09.png',
      officeCity: 'Nienborstel'
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

  protected getRepresentatives(city: string): Representative[] {
    return this.representatives.filter(rep => rep.officeCity === city);
  }
}
