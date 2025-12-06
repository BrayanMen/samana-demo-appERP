import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  unit: string;
  icon: string;
  lowStockThreshold: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class InventoryComponent {
  
  inventoryItems = signal<InventoryItem[]>([
    { id: '1', name: 'Martillos de Garra', stock: 15, unit: 'unidades', icon: 'construction', lowStockThreshold: 10 },
    { id: '2', name: 'Cajas de Cerámica', stock: 82, unit: 'cajas', icon: 'square_foot', lowStockThreshold: 50 },
    { id: '3', name: 'Tornillos 1 pulgada', stock: 2, unit: 'cajas', icon: 'hardware', lowStockThreshold: 5 },
    { id: '4', name: 'Taladro Percutor', stock: 8, unit: 'unidades', icon: 'precision_manufacturing', lowStockThreshold: 5 },
    { id: '5', name: 'Pintura Blanca (10L)', stock: 25, unit: 'latas', icon: 'format_paint', lowStockThreshold: 10 },
  ]);

  lowStockAlerts = computed(() => 
    this.inventoryItems().filter(item => item.stock <= item.lowStockThreshold)
  );

}
