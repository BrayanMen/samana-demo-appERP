import { ChangeDetectionStrategy, Component, OnInit, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-expense',
  templateUrl: './register-expense.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class RegisterExpenseComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // FIX: Explicitly type `fb` as `FormBuilder` to fix type inference issue.
  private fb: FormBuilder = inject(FormBuilder);

  expenseForm!: FormGroup;
  receiptPreview = signal<string | null>(null);

  ngOnInit() {
    this.expenseForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      receipt: [null, Validators.required], // Store the file object
      description: [''],
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.expenseForm.patchValue({ receipt: file });
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.receiptPreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  
  removeReceipt() {
      this.receiptPreview.set(null);
      this.expenseForm.patchValue({ receipt: null });
      this.fileInput.nativeElement.value = '';
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      console.log('Expense Submitted:', this.expenseForm.value);
      alert('Gasto guardado con éxito. Ver la consola para más detalles.');
      this.expenseForm.reset();
      this.receiptPreview.set(null);
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
