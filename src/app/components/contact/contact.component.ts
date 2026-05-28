import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private readonly appState = inject(AppStateService);

  // Getter/Setter properties to cleanly proxy the shared app state signal
  // This allows [(ngModel)]="contactTopic" to work bidirectionally
  get contactTopic(): string {
    return this.appState.contactTopic();
  }
  set contactTopic(value: string) {
    this.appState.contactTopic.set(value);
  }

  // Local callback request states
  protected readonly contactName = signal<string>('');
  protected readonly contactEmail = signal<string>('');
  protected readonly contactPhone = signal<string>('');
  protected readonly contactMessage = signal<string>('');
  protected readonly formSubmitted = signal<boolean>(false);

  constructor() {}

  protected submitContactForm(event: Event): void {
    event.preventDefault();
    if (this.contactName() && this.contactEmail()) {
      this.formSubmitted.set(true);

      // Auto-reset the form success state after 6 seconds
      setTimeout(() => {
        this.formSubmitted.set(false);
        this.contactName.set('');
        this.contactEmail.set('');
        this.contactPhone.set('');
        this.contactTopic = 'allgemein';
        this.contactMessage.set('');
      }, 6000);
    }
  }
}
