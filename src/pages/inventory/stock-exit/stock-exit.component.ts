import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-exit',
  templateUrl: './stock-exit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class StockExitComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  exitForm!: FormGroup;

  ngOnInit() {
    this.exitForm = this.fb.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      exitDate: [new Date().toISOString().substring(0, 10), Validators.required],
      reason: ['', Validators.required],
      notes: [''],
    });
  }

  registerExit() {
    if (this.exitForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    console.log('Stock exit registered:', this.exitForm.value);
    alert('Salida de stock registrada con éxito.');
    this.router.navigate(['/inventory']);
  }
}
