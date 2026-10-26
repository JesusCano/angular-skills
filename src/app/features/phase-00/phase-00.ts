import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHASE_00_TOPICS, type TopicSection } from './phase-00.content';

@Component({
  selector: 'app-phase-00',
  imports: [RouterLink],
  templateUrl: './phase-00.html',
  styleUrl: './phase-00.scss',
})
export class Phase00 {
  protected readonly topics = signal<readonly TopicSection[]>(PHASE_00_TOPICS);

  // Split an EN\n\nES explanation into its two paragraphs so the template
  // can render them separately - see CLAUDE.md bilingual comments convention.
  // Divide una explicacion EN\n\nES en sus dos parrafos para que la plantilla
  // los renderice por separado.
  protected explanationParts(explanation: string): readonly string[] {
    return explanation.split('\n\n');
  }

  protected statusLabel(status: TopicSection['status']): string {
    switch (status) {
      case 'covered':
        return 'Covered';
      case 'in-progress':
        return 'In progress';
      case 'not-started':
        return 'Not started';
    }
  }
}
