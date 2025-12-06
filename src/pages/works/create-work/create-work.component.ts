import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class CreateWorkComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  workForm!: FormGroup;

  ngOnInit() {
    this.workForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [null, [Validators.required, Validators.min(1)]],
      initialStatus: ['Planeación', Validators.required],
    });
  }

  createWork() {
    if (this.workForm.valid) {
      console.log('New work created:', this.workForm.value);
      alert('Obra creada con éxito (ver consola para detalles).');
      // In a real app, you would send this to a service
      // and then navigate.
      this.router.navigate(['/works']);
    } else {
      alert('Por favor complete todos los campos requeridos.');
    }
  }
}