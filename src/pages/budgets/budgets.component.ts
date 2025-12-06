import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
})
export class BudgetsComponent {
  manoDeObra = signal(1500);
  materiales = signal(3200);
  transporte = signal(250);
  horasExtra = signal(400);

  subtotal = computed(() => 
    (this.manoDeObra() || 0) + 
    (this.materiales() || 0) + 
    (this.transporte() || 0) + 
    (this.horasExtra() || 0)
  );
  
  iva = computed(() => this.subtotal() * 0.21);
  
  total = computed(() => this.subtotal() + this.iva());

  obrasActivas = signal([
    'Reforma Integral - Villa Marbella',
    'Construcción Piscina - Finca Rústica',
    'Ampliación Cocina - Cliente Particular',
  ]);
}