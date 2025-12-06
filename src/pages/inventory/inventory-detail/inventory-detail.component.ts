import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

type MovementType = 'Entrada' | 'Asignación a Obra' | 'Devolución de Obra' | 'Pérdida/Daño';

interface Movement {
  type: MovementType;
  quantity: number;
  notes: string;
  date: string;
}

interface InventoryItemDetail {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  icon: string;
  movements: Movement[];
}

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class InventoryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  item = signal<InventoryItemDetail | undefined>(undefined);

  private allItems: InventoryItemDetail[] = [
    {
      id: '1',
      name: 'Martillos de Garra',
      category: 'Herramienta Manual',
      stock: 15,
      unit: 'unidades',
      icon: 'construction',
      movements: [
        { type: 'Entrada', quantity: 10, notes: 'Factura #12345', date: 'hace 2 días' },
        { type: 'Asignación a Obra', quantity: -5, notes: 'Obra "Torre Central"', date: 'hace 5 días' },
        { type: 'Devolución de Obra', quantity: 2, notes: 'Obra "Torre Central"', date: 'hace 8 días' },
        { type: 'Pérdida/Daño', quantity: -1, notes: 'Reporte de J. Pérez', date: 'hace 10 días' },
      ]
    },
    // Other items would go here
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const itemData = this.allItems.find(i => i.id === id) ?? this.allItems[0]; // fallback for demo
        this.item.set(itemData);
      }
    });
  }

  getMovementIcon(type: MovementType): string {
    switch (type) {
      case 'Entrada': return 'add_shopping_cart';
      case 'Asignación a Obra': return 'north_east';
      case 'Devolución de Obra': return 'undo';
      case 'Pérdida/Daño': return 'heart_broken';
    }
  }

  getMovementColorClass(type: MovementType): string {
    switch (type) {
      case 'Entrada': return 'bg-green-500/20 text-green-400';
      case 'Devolución de Obra': return 'bg-blue-500/20 text-blue-400';
      case 'Asignación a Obra': return 'bg-red-500/20 text-red-400';
      case 'Pérdida/Daño': return 'bg-yellow-500/20 text-yellow-400';
    }
  }
}
