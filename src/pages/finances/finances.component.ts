import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

interface ObraSummary {
  id: string;
  title: string;
  profit: number;
  icon: string;
}

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class FinancesComponent implements OnInit {
  // FIX: Explicitly type `fb` as `FormBuilder` to fix type inference issue.
  private fb: FormBuilder = inject(FormBuilder);

  isModalOpen = signal(false);
  modalTitle = signal('Registrar Ingreso');
  transactionForm!: FormGroup;

  obras = signal<ObraSummary[]>([
    { id: 'Remodelación Casa Cumbres', title: 'Remodelación Casa Cumbres', profit: 7150.00, icon: 'foundation' },
    { id: 'Oficinas Corporativas Hub', title: 'Oficinas Corporativas Hub', profit: 14200.00, icon: 'apartment' },
  ]);

  ngOnInit() {
    this.transactionForm = this.fb.group({
      type: ['income', Validators.required],
      obraId: ['', Validators.required],
      description: ['', Validators.required],
      amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  openTransactionModal(type: 'income' | 'expense') {
    this.modalTitle.set(type === 'income' ? 'Registrar Ingreso' : 'Registrar Egreso');
    this.transactionForm.reset({
      type: type,
      obraId: '',
      description: '',
      amount: null,
      date: new Date().toISOString().split('T')[0]
    });
    this.isModalOpen.set(true);
  }

  closeTransactionModal() {
    this.isModalOpen.set(false);
  }

  saveTransaction() {
    if (this.transactionForm.valid) {
      console.log('Saving transaction:', this.transactionForm.value);
      alert('Transacción guardada exitosamente. Ver la consola para más detalles.');
      this.closeTransactionModal();
    }
  }

  exportToPDF() {
    console.log('Exporting financial reports to PDF...');
    alert('La funcionalidad de exportar a PDF no está implementada en este prototipo.');
  }
}
