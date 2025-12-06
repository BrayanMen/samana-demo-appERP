import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface EmployeePayroll {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  salary: number;
  status: 'Pendiente' | 'Pagado';
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class PayrollComponent implements OnInit {
  // FIX: Explicitly type `fb` as `FormBuilder` to fix type inference issue.
  private fb: FormBuilder = inject(FormBuilder);

  payrollForm!: FormGroup;
  
  employees = signal<EmployeePayroll[]>([
      { id: '1', name: 'Ana García', role: 'Arquitecta Principal', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmNrGAccZUMUu4IPIWuJxRWcUUOLy2b_Hu7DwM5FqvCHAJ8rOLYPmBLpnXUMsT2ok8BMLyXYtZDcbegbqf1GN-wbyS0r1VuQ0n9xex14Qxr5Z6ltnAgWkbFFKnIbpC3Ql91ay_AeQLr-LIyTCJSpByX-tXnNA90yICjpXV5SlZ0z30RYkrRoQ5IpYvNVqsG3ZIHM_HUF8XmqHGFlOzx2Pdct6Pa1Z17bG_GotB2_jyzZLhJOy9Cw34xT5VyLcApXDPCFWXvhXf--F', salary: 3500, status: 'Pendiente' },
      { id: '2', name: 'Carlos Rodriguez', role: 'Jefe de Obra', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m', salary: 3200, status: 'Pendiente' },
      { id: '3', name: 'Lucia Fernandez', role: 'Electricista', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnITCX7Ck6ggZYA1_Y_leS9kB3Bw6Ev3WYa4CNMeUl6_f2wTp7iU0AeYICYMLFvdRoK2LoyFd-p6QMb71br8UUTdpsijy5WOi4zI8KoPnYBLEWN9YXtuTJQZAb11KKpWNP05rGS4mWlyxS4fW15sozf0S5YNoBb3eMwpDE-_HiqlE2DIRzsRI-veq7nwgBX_Fy0z5pSE9H7MXK4c4d0LrAa9MR2UbK5L4gZplmyPg1F2fcBXMF6lWp1atf9P01nT-up6pXEDy2pdyL', salary: 2800, status: 'Pagado' },
      { id: '4', name: 'Javier Martinez', role: 'Fontanero', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMEQAOxCRrmqDpO2Nj8pM_TRV7dLGEr88qNzr6tADhCcI4kD7xzyQk2HLf7Of6k5Xqay5ri6BgblkTMLpkC7zIQYMFw-E4sAU6-oSQprzcOkCxEOJ10Up_uBCu5AbgiVdGu5TkhvFczzoXP0XG_OA97-0OhMOGaiiPuVdXC18I3n0S3BINsi-ACDL0rMNZpzNhhvVbOx04SocJVITNfe8goZw9G-hN5aSsIt0LABm8pZ3CLWGW6_VXymIgkt9NZnennkno46PDVF3', salary: 2750, status: 'Pendiente' },
      { id: '5', name: 'Sofía López', role: 'Diseñadora de Interiores', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHGf4gAfEwTPdyWzwAOsxDK79p794RLyMcv6CPcqPTj8RMMC8QJOX9zomSiSWkICf4SrOlaBU0FOT0w7ySI40uwJ7ZD3bqf9k7SpeLQaCTjWaDqZp1sj2YAjDo_MNVESUI5awfnAWWnqSLginrDU_JeUKoPyZMsyRqme7QFKiB5apbJ2YN1Pe0Z3IbmGud4poLudUEO-EWOKEFLktd409q58U-y2JhellLTVJN1QFkpa5lcExNSRLmDoVr1h8lzbFDUdRjfMpqG-KX', salary: 2900, status: 'Pendiente' },
  ]);

  totalToPay = computed(() => {
    if (!this.payrollForm) return 0;

    const selectedIds = Object.keys(this.payrollForm.value).filter(
      id => this.payrollForm.value[id]
    );

    return this.employees().reduce((total, emp) => {
      if (selectedIds.includes(emp.id) && emp.status === 'Pendiente') {
        return total + emp.salary;
      }
      return total;
    }, 0);
  });
  
  selectedCount = computed(() => {
      if (!this.payrollForm) return 0;
      return Object.values(this.payrollForm.value).filter(v => v).length;
  });

  ngOnInit() {
    const controls: { [key: string]: any } = {};
    this.employees().forEach(emp => {
      // Only create controls for pending employees
      if (emp.status === 'Pendiente') {
        controls[emp.id] = this.fb.control(false);
      }
    });
    this.payrollForm = this.fb.group(controls);
  }

  processPayment() {
    const selectedIds = Object.keys(this.payrollForm.value).filter(
      id => this.payrollForm.value[id]
    );

    if (selectedIds.length === 0) {
        alert("Por favor, seleccione al menos un empleado para pagar.");
        return;
    }

    console.log(`Processing payment for ${selectedIds.length} employees, total: ${this.totalToPay()}`);
    
    this.employees.update(currentEmployees => 
        currentEmployees.map(emp => 
            selectedIds.includes(emp.id) ? { ...emp, status: 'Pagado' } : emp
        )
    );

    // Reset form
    this.payrollForm.reset();
    alert('Pago procesado con éxito.');
  }
}