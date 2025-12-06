import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface Work {
  title: string;
  status: string;
}

interface Tool {
  id: string;
  name: string;
  stock: number;
  imageUrl: string;
  icon: string;
  requestedQuantity: number;
}

@Component({
  selector: 'app-assign-tools-to-work',
  templateUrl: './assign-tools-to-work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class AssignToolsToWorkComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  work = signal<Work | undefined>(undefined);
  searchTerm = signal('');

  private allWorks: Work[] = [
      { title: 'Remodelación Av. Principal', status: 'En Progreso' },
      { title: 'Cocina Familia Pérez', status: 'Retrasada' },
  ];

  allTools = signal<Tool[]>([
    { id: 't1', name: 'Taladro Percutor', stock: 5, imageUrl: '', icon: 'precision_manufacturing', requestedQuantity: 0 },
    { id: 't2', name: 'Martillo Demoledor', stock: 2, imageUrl: '', icon: 'handyman', requestedQuantity: 0 },
    { id: 't3', name: 'Sierra Circular', stock: 3, imageUrl: '', icon: 'carpenter', requestedQuantity: 1 },
    { id: 't4', name: 'Clavadora Neumática', stock: 1, imageUrl: '', icon: 'construction', requestedQuantity: 1 },
    { id: 't5', name: 'Compresor de Aire', stock: 4, imageUrl: '', icon: 'compress', requestedQuantity: 0 },
  ]);

  filteredTools = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allTools();
    return this.allTools().filter(tool => tool.name.toLowerCase().includes(term));
  });
  
  totalSelected = computed(() => this.allTools().reduce((sum, tool) => sum + tool.requestedQuantity, 0));

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const workId = params.get('id');
      if (workId) {
        const data = this.allWorks.find(w => w.title === workId);
        this.work.set(data);
      }
    });
  }

  updateSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  updateQuantity(toolId: string, change: number) {
    this.allTools.update(tools =>
      tools.map(tool => {
        if (tool.id === toolId) {
          const newQuantity = tool.requestedQuantity + change;
          // For this demo, let's assume we can assign more than stock, to show error state
           if (newQuantity >= 0) {
            return { ...tool, requestedQuantity: newQuantity };
          }
        }
        return tool;
      })
    );
  }

  confirmAssignment() {
    const assignments = this.allTools().filter(t => t.requestedQuantity > 0);
    const overStock = assignments.some(t => t.requestedQuantity > t.stock);

    if (overStock) {
        alert('Una o más herramientas superan el stock disponible. Por favor, corrija las cantidades.');
        return;
    }
    
    if (assignments.length === 0) {
      alert('No se ha seleccionado ninguna herramienta.');
      return;
    }
    console.log(`Assigning ${assignments.length} tool types to ${this.work()?.title}:`, assignments);
    alert(`Asignación a la obra "${this.work()?.title}" confirmada.`);
    this.router.navigate(['/works', this.work()?.title]);
  }
}