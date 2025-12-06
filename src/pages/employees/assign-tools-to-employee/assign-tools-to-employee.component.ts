import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface Employee {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
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
  selector: 'app-assign-tools-to-employee',
  templateUrl: './assign-tools-to-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class AssignToolsToEmployeeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employee = signal<Employee | undefined>(undefined);
  searchTerm = signal('');

  private allEmployees: Employee[] = [
      { id: '1', name: 'Ana García', role: 'Arquitecta Principal', avatarUrl: '...' },
      { id: '2', name: 'Carlos Rodriguez', role: 'Jefe de Obra', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m' },
  ];

  allTools = signal<Tool[]>([
    { id: 't1', name: 'Martillo de Uña', stock: 12, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoeblGI-J4Mt5_0UNL0AHAk3oiflWa0e1CZWi7mmBfNKzr3hV8csaYgRTq4DeVAL3rP1AhKIG7cbCrj0kaxNyAE3QRsX9dtJI_veeT9Q5M9BiqsNYQpsJ_CMsGK26e6oPEssHRnFMGrUMdO0VahUWrg5JWsD6SijNsNFla5qHZWZyZV4-clTBFXuUO9U1D1nX1nWtQRXG0BpOwZ9fiCfy3hZIfbGehrMynfnUuyhZdnoCIK_uN7m0iQNMNIzCfL-KR6px8I8RHkzi5', icon: 'construction', requestedQuantity: 0 },
    { id: 't2', name: 'Juego de Destornilladores', stock: 8, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzv_JaIgI3AYE67xKkgka_sHdxAuVUKvDc1LJbVr-2ILqE5BA3j2HdPjnwkQQchjTs9CqAqPqUyzt6QR5oA_AenQ3txuKcMHhVo0trgPuNmzJqm2yQOLQ9sMJgE-51F_JGm0AXRLxZep20jan61p8u1PXE_LL_6LcPP8o0o7yYjz_5apjPDFqvguzYxcj-Aae3D_jMoJTPLRVI9EcVHGL_tDycokKPPp5rgn7Rf4Y1uuIKMzkgfkUqTsg0WAJ6fMTnfaWfk0d_ovUp', icon: 'hardware', requestedQuantity: 0 },
    { id: 't3', name: 'Taladro Inalámbrico', stock: 5, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAirIb7rfRsXXzQsBevR-u0xO3DoSHwn_GyImHznDstJhnarHqQL2-qpmBX1R-Y5-qLqU8Aal7_gNB8-eKp7MipnuBNUJWOz_JhemAq1Cs0hY8a5hOAf0vsMKKb6lbO_7M7E_xWOpMxa8b53wVG0gYuO_wSlMwqmRVBrQ9t5C-V85xutpy5MZXnvhjxz25Et8biPS92ulH8jhIl6bnqut_ApZIW4n6dMwZNuyRlDWAxE9eoop9eGo-_DoYBZvEBSOUk6JRa2R77j8dj', icon: 'precision_manufacturing', requestedQuantity: 0 },
    { id: 't4', name: 'Cinta Métrica (5m)', stock: 20, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkihGq0Ok-7cBuWMEcDu2bZvJmo6fHEqBefJUpOdt3W7ExDnisl9PqjEOtIYs3kFxRqZ4hYHi2jNl0kjR-YcSzucfWNCXg545EQ8M0q7YTrnZ3DSfEo6OsXcvuGNjIAYnFULPTkNDeC5Iyt9VdQwegGfbHZcoU0W-q5PGXL4-EVM4TVIHBkLZlAD2ld4GZu4PaImMAKSShuBIHQ6nP4dNTFS7PqyyIypnOqTZr7fu5vVYI_VC6dON2A9GNMzlbgyKVXyjt1a46Gq3_', icon: 'square_foot', requestedQuantity: 2 },
  ]);

  filteredTools = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allTools();
    return this.allTools().filter(tool => tool.name.toLowerCase().includes(term));
  });
  
  totalSelected = computed(() => this.allTools().reduce((sum, tool) => sum + tool.requestedQuantity, 0));

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('id');
      if (employeeId) {
        const data = this.allEmployees.find(emp => emp.id === employeeId);
        this.employee.set(data);
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
          if (newQuantity >= 0 && newQuantity <= tool.stock) {
            return { ...tool, requestedQuantity: newQuantity };
          }
        }
        return tool;
      })
    );
  }

  confirmAssignment() {
    const assignments = this.allTools().filter(t => t.requestedQuantity > 0);
    if (assignments.length === 0) {
      alert('No se ha seleccionado ninguna herramienta.');
      return;
    }
    console.log(`Assigning ${assignments.length} tool types to ${this.employee()?.name}:`, assignments);
    alert(`Asignación a ${this.employee()?.name} confirmada.`);
    this.router.navigate(['/employees', this.employee()?.id]);
  }
}