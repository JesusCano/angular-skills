import { Component, computed, signal } from '@angular/core';
import { ROADMAP_PHASES, type Phase, type PhaseStatus } from './roadmap-data';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Static for now - this becomes a natural signal() example once we
  // formally cover signals in Phase 01 (e.g. toggling status on click).
  protected readonly phases = signal<readonly Phase[]>(ROADMAP_PHASES);

  protected readonly doneCount = computed(
    () => this.phases().filter((p) => p.status === 'done').length,
  );

  protected readonly totalCount = computed(() => this.phases().length);

  protected statusLabel(status: PhaseStatus): string {
    switch (status) {
      case 'done':
        return 'Done';
      case 'in-progress':
        return 'In progress';
      case 'not-started':
        return 'Not started';
    }
  }
}
