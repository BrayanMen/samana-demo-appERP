import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class NewItemComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  itemForm!: FormGroup;

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      sku: [''],
      initialQuantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required],
      price: [null, [Validators.min(0)]],
    });
  }

  saveMaterial() {
    if (this.itemForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    console.log('New material saved:', this.itemForm.value);
    alert('Material guardado con éxito.');
    this.router.navigate(['/inventory']);
  }
}
