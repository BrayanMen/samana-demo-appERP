import { ChangeDetectionStrategy, Component, signal, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class ReportIncidentComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // FIX: Explicitly type `fb` as `FormBuilder` to fix type inference issue.
  private fb: FormBuilder = inject(FormBuilder);

  incidentForm!: FormGroup;
  previews = signal<string[]>([]);
  files = signal<File[]>([]);

  ngOnInit() {
    this.incidentForm = this.fb.group({
      incidentType: ['Falta de material', Validators.required],
      description: ['', Validators.required],
      location: ['Av. Siempre Viva 742, Springfield, EE. UU.', Validators.required],
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      if (this.files().length < 5) {
        this.files.update(files => [...files, file]);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.update(p => [...p, e.target.result]);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.files.update(files => files.filter((_, i) => i !== index));
    this.previews.update(previews => previews.filter((_, i) => i !== index));
  }

  onSubmit() {
    if (this.incidentForm.valid) {
      console.log('Incident Report Submitted:');
      console.log('Form Data:', this.incidentForm.value);
      console.log('Files:', this.files());
      alert('Reporte de incidencia enviado con éxito.');
      // Here you would typically send the data to a service
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
