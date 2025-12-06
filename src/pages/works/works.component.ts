import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
  assignedTo?: string;
}

interface Work {
  title: string;
  deadline: string;
  deadlineDate: string; 
  status: 'En Progreso' | 'Retrasada' | 'Completada';
  timeline: string;
  budget: string;
  quality: number;
  dailyProgressActionable: boolean;
  assignedEmployeeIds: string[];
  tasks: Task[];
}

interface Employee {
  id: string;
  name: string;
}

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class WorksComponent {
  private fb: FormBuilder = inject(FormBuilder);

  isFilterOpen = signal(false);
  filterForm: FormGroup = this.fb.group({
    status: [''],
    deadlineStart: [''],
    deadlineEnd: [''],
    assignedEmployee: ['']
  });

  employees = signal<Employee[]>([
    { id: '1', name: 'Ana García' },
    { id: '2', name: 'Carlos Rodriguez' },
    { id: '3', name: 'Lucia Fernandez' },
    { id: '4', name: 'Javier Martinez' },
  ]);

  works = signal<Work[]>([
    { 
      title: 'Remodelación Av. Principal', 
      deadline: 'Finaliza en 12 días', 
      deadlineDate: '2024-08-10', 
      status: 'En Progreso', 
      timeline: 'A tiempo', 
      budget: '$18k / $20k', 
      quality: 98, 
      dailyProgressActionable: true, 
      assignedEmployeeIds: ['2', '3'],
      tasks: [
        { id: 't1', name: 'Instalación de piso flotante', dueDate: '2024-08-01', completed: true, assignedTo: '2' },
        { id: 't2', name: 'Pintura de muros', dueDate: '2024-08-05', completed: true, assignedTo: '3' },
        { id: 't3', name: 'Instalación de luminarias', dueDate: '2024-08-08', completed: true, assignedTo: '3' },
        { id: 't4', name: 'Revisión final', dueDate: '2024-08-10', completed: false, assignedTo: '2' },
      ]
    },
    { 
      title: 'Cocina Familia Pérez', 
      deadline: 'Finaliza en 25 días', 
      deadlineDate: '2024-08-23', 
      status: 'Retrasada', 
      timeline: '-3 días', 
      budget: '$4.5k / $8k', 
      quality: 92, 
      dailyProgressActionable: true, 
      assignedEmployeeIds: ['1', '4'],
      tasks: [
        { id: 't5', name: 'Demolición de azulejos', dueDate: '2024-07-20', completed: true, assignedTo: '4' },
        { id: 't6', name: 'Plomería nueva', dueDate: '2024-07-25', completed: true, assignedTo: '4' },
        { id: 't7', name: 'Instalación de gabinete', dueDate: '2024-08-01', completed: false, assignedTo: '1' },
        { id: 't8', name: 'Instalación de encimera', dueDate: '2024-08-05', completed: false, assignedTo: '1' },
        { id: 't9', name: 'Conexión de electrodomésticos', dueDate: '2024-08-10', completed: false, assignedTo: '3' },
      ]
    },
    { 
      title: 'Baños Oficentro Corp', 
      deadline: 'Finalizada', 
      deadlineDate: '2024-07-15', 
      status: 'Completada', 
      timeline: '+2 días', 
      budget: '$16k / $15k', 
      quality: 95, 
      dailyProgressActionable: false, 
      assignedEmployeeIds: ['2'],
      tasks: [
        { id: 't10', name: 'Cambio de tuberías', dueDate: '2024-07-01', completed: true },
        { id: 't11', name: 'Instalación de nuevos sanitarios', dueDate: '2024-07-05', completed: true },
        { id: 't12', name: 'Colocación de cerámica', dueDate: '2024-07-10', completed: true },
        { id: 't13', name: 'Instalación de grifería', dueDate: '2024-07-12', completed: true },
      ]
    },
  ]);
  
  filteredWorks = computed(() => {
    const filters = this.filterForm.value;
    return this.works().filter(work => {
      const statusMatch = !filters.status || work.status === filters.status;
      const deadlineStartMatch = !filters.deadlineStart || work.deadlineDate >= filters.deadlineStart;
      const deadlineEndMatch = !filters.deadlineEnd || work.deadlineDate <= filters.deadlineEnd;
      const employeeMatch = !filters.assignedEmployee || work.assignedEmployeeIds.includes(filters.assignedEmployee);
      return statusMatch && deadlineStartMatch && deadlineEndMatch && employeeMatch;
    });
  });

  workProgress(work: Work): number {
    if (work.tasks.length === 0) {
      return 0;
    }
    const completedTasks = work.tasks.filter(t => t.completed).length;
    return Math.round((completedTasks / work.tasks.length) * 100);
  }

  toggleFilterPanel() {
    this.isFilterOpen.update(v => !v);
  }

  resetFilters() {
    this.filterForm.reset({
      status: '',
      deadlineStart: '',
      deadlineEnd: '',
      assignedEmployee: ''
    });
  }

  applyFilters() {
    this.isFilterOpen.set(false);
  }

  approveDailyProgress(workTitle: string, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.works.update(currentWorks => 
      currentWorks.map(work => 
        work.title === workTitle ? { ...work, dailyProgressActionable: false } : work
      )
    );
    alert(`Avance diario para "${workTitle}" aprobado.`);
  }

  disapproveDailyProgress(workTitle: string, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    alert(`Avance desaprobado para "${workTitle}". Añade comentarios correctivos en la página de detalle.`);
  }

  getStatusClass(status: 'En Progreso' | 'Retrasada' | 'Completada') {
    switch (status) {
      case 'En Progreso': return 'bg-blue-500/20 text-blue-300';
      case 'Retrasada': return 'bg-yellow-500/20 text-yellow-300';
      case 'Completada': return 'bg-green-500/20 text-green-300';
    }
  }

  getTimelineClass(timeline: string) {
    if (timeline.startsWith('-')) return 'text-yellow-400';
    if (timeline.startsWith('+')) return 'text-green-400';
    if (timeline === 'A tiempo') return 'text-green-400';
    return 'text-white';
  }
}