import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-loss',
  templateUrl: './stock-loss.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class StockLossComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  lossForm!: FormGroup;

  ngOnInit() {
    this.lossForm = this.fb.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      lossDate: [new Date().toISOString().substring(0, 10), Validators.required],
      reason: ['', Validators.required],
      notes: [''],
    });
  }

  registerLoss() {
    if (this.lossForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    console.log('Stock loss registered:', this.lossForm.value);
    alert('Pérdida registrada con éxito.');
    this.router.navigate(['/inventory']);
  }
}
