import { ChangeDetectionStrategy, Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upload-evidence',
  templateUrl: './upload-evidence.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class UploadEvidenceComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  previews = signal<string[]>([]);
  files = signal<File[]>([]);
  description = signal('');

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      this.files.update(files => [...files, file]);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previews.update(p => [...p, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.files.update(files => files.filter((_, i) => i !== index));
    this.previews.update(previews => previews.filter((_, i) => i !== index));
  }

  submitEvidence() {
    if (this.files().length === 0) {
      alert('Por favor, añade al menos una foto o video.');
      return;
    }
    console.log('Submitting evidence...');
    console.log('Files:', this.files());
    console.log('Description:', this.description());
    alert('¡Evidencia subida con éxito! (ver consola para detalles)');
    
    // Reset state
    this.files.set([]);
    this.previews.set([]);
    this.description.set('');
  }

  updateDescription(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.description.set(target.value);
  }
}