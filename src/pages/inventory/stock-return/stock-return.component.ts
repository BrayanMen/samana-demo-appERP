import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-return',
  templateUrl: './stock-return.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class StockReturnComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  returnForm!: FormGroup;

  ngOnInit() {
    this.returnForm = this.fb.group({
      itemType: ['Materiales', Validators.required],
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      returnDate: [new Date().toISOString().substring(0, 10), Validators.required],
      origin: ['', Validators.required],
      notes: [''],
    });
  }

  registerReturn() {
    if (this.returnForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    console.log('Stock return registered:', this.returnForm.value);
    alert('Devolución registrada con éxito.');
    this.router.navigate(['/inventory']);
  }
}
