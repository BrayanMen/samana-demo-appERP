import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProfitMargin {
  name: string;
  margin: number; // as percentage
  profit: number;
}

interface CompletionRate {
    month: string;
    completed: number;
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class MetricsComponent {
  activeTimeFilter = signal<'Semana' | 'Mes' | 'Año'>('Mes');

  // Mock data for the metrics panel
  financialSummary = signal({
    netProfit: 15250,
    vsPreviousMonth: 5.2,
  });

  deadlines = signal({
    onTimePercentage: 85,
  });

  workQuality = signal({
    approvedPercentage: 92,
    approvedCount: 112,
    rejectedCount: 10,
  });

  generalPerformance = signal({
    active: 12,
    completed: 45,
    pending: 3,
  });

  employeePunctuality = signal({
    onTimePercentage: 95,
  });

  timeFilters = ['Semana', 'Mes', 'Año'] as const;

  completionRateOverTime = signal<CompletionRate[]>([
      { month: 'Ene', completed: 3 },
      { month: 'Feb', completed: 5 },
      { month: 'Mar', completed: 4 },
      { month: 'Abr', completed: 6 },
      { month: 'May', completed: 5 },
      { month: 'Jun', completed: 7 },
  ]);
  
  maxCompletions = this.completionRateOverTime().reduce((max, item) => item.completed > max ? item.completed : max, 0);


  profitMarginsPerObra = signal<ProfitMargin[]>([
    { name: 'Remodelación Av. Principal', margin: 15, profit: 3000 },
    { name: 'Cocina Familia Pérez', margin: 22, profit: 1760 },
    { name: 'Baños Oficentro Corp', margin: 8, profit: 1280 },
    { name: 'Residencial Vista Hermosa', margin: 18, profit: 4500 },
  ]);

  setTimeFilter(filter: 'Semana' | 'Mes' | 'Año') {
    this.activeTimeFilter.set(filter);
    // In a real app, you would refetch data based on the filter
    console.log(`Time filter set to: ${filter}`);
  }
  
  getBarHeight(value: number): string {
    if (this.maxCompletions === 0) return '0%';
    return `${(value / this.maxCompletions) * 100}%`;
  }
}
