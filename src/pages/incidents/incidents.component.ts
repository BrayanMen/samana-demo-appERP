import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Incident {
  id: string;
  title: string;
  obra: string;
  reporter: string;
  date: string;
  status: 'Pendiente' | 'En Progreso' | 'Resuelta';
  icon: string;
}

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class IncidentsComponent {
  searchTerm = signal('');
  activeFilter = signal<'Todos' | 'Pendiente' | 'En Progreso' | 'Resuelta'>('Todos');
  statusFilters =['Todos', 'Pendiente', 'En Progreso', 'Resuelta'] as const;
  
  allIncidents = signal<Incident[]>([
    { id: '1', title: 'Falla de Equipo', obra: 'Remodelación Centro', reporter: 'Alejandro Vargas', date: '15/07/2024', status: 'Pendiente', icon: 'build' },
    { id: '2', title: 'Accidente Laboral', obra: 'Edificio Corporativo', reporter: 'Sofia Castillo', date: '14/07/2024', status: 'En Progreso', icon: 'personal_injury' },
    { id: '3', title: 'Material Faltante', obra: 'Torres del Parque', reporter: 'Carlos Méndez', date: '12/07/2024', status: 'Resuelta', icon: 'inventory_2' },
    { id: '4', title: 'Problema con Planos', obra: 'Remodelación Centro', reporter: 'Laura Jiménez', date: '11/07/2024', status: 'Resuelta', icon: 'design_services' },
    { id: '5', title: 'Fuga de agua en baño principal', obra: 'Residencia Miller', reporter: 'Juan Pérez', date: '10/07/2024', status: 'Pendiente', icon: 'water_damage' },
  ]);

  filteredIncidents = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const filter = this.activeFilter();

    return this.allIncidents().filter(incident => {
      const termMatch = incident.obra.toLowerCase().includes(term) || 
                        incident.reporter.toLowerCase().includes(term) ||
                        incident.title.toLowerCase().includes(term);

      const statusMatch = filter === 'Todos' || incident.status === filter;

      return termMatch && statusMatch;
    });
  });

  updateSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  setFilter(filter: 'Todos' | 'Pendiente' | 'En Progreso' | 'Resuelta') {
    this.activeFilter.set(filter);
  }

  getStatusClass(status: 'Pendiente' | 'En Progreso' | 'Resuelta') {
    switch (status) {
      case 'Pendiente': return 'bg-yellow-500/20 text-yellow-300';
      case 'En Progreso': return 'bg-blue-500/20 text-blue-300';
      case 'Resuelta': return 'bg-gray-500/20 text-gray-300';
    }
  }
}