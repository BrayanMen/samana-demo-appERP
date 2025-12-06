import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class StockEntryComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  entryForm!: FormGroup;

  ngOnInit() {
    this.entryForm = this.fb.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      entryDate: [new Date().toISOString().substring(0, 10), Validators.required],
      provider: [''],
      notes: [''],
    });
  }

  registerEntry() {
    if (this.entryForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    console.log('Stock entry registered:', this.entryForm.value);
    alert('Entrada de stock registrada con éxito.');
    this.router.navigate(['/inventory']);
  }
}
