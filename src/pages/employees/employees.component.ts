import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

interface Employee {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
  email: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
})
export class EmployeesComponent {
  private fb: FormBuilder = inject(FormBuilder);

  isModalOpen = signal(false);
  employeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    avatarUrl: [''],
    status: ['active', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  employees = signal<Employee[]>([
    { id: '1', name: 'Ana García', email: 'ana.garcia@constructora.com', role: 'Arquitecta Principal', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmNrGAccZUMUu4IPIWuJxRWcUUOLy2b_Hu7DwM5FqvCHAJ8rOLYPmBLpnXUMsT2ok8BMLyXYtZDcbegbqf1GN-wbyS0r1VuQ0n9xex14Qxr5Z6ltnAgWkbFFKnIbpC3Ql91ay_AeQLr-LIyTCJSpByX-tXnNA90yICjpXV5SlZ0z30RYkrRoQ5IpYvNVqsG3ZIHM_HUF8XmqHGFlOzx2Pdct6Pa1Z17bG_GotB2_jyzZLhJOy9Cw34xT5VyLcApXDPCFWXvhXf--F', status: 'active' },
    { id: '2', name: 'Carlos Rodriguez', email: 'carlos.rodriguez@constructora.com', role: 'Jefe de Obra', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m', status: 'active' },
    { id: '3', name: 'Lucia Fernandez', email: 'lucia.fernandez@constructora.com', role: 'Electricista', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnITCX7Ck6ggZYA1_Y_leS9kB3Bw6Ev3WYa4CNMeUl6_f2wTp7iU0AeYICYMLFvdRoK2LoyFd-p6QMb71br8UUTdpsijy5WOi4zI8KoPnYBLEWN9YXtuTJQZAb11KKpWNP05rGS4mWlyxS4fW15sozf0S5YNoBb3eMwpDE-_HiqlE2DIRzsRI-veq7nwgBX_Fy0z5pSE9H7MXK4c4d0LrAa9MR2UbK5L4gZplmyPg1F2fcBXMF6lWp1atf9P01nT-up6pXEDy2pdyL', status: 'active' },
    { id: '4', name: 'Javier Martinez', email: 'javier.martinez@constructora.com', role: 'Fontanero', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMEQAOxCRrmqDpO2Nj8pM_TRV7dLGEr88qNzr6tADhCcI4kD7xzyQk2HLf7Of6k5Xqay5ri6BgblkTMLpkC7zIQYMFw-E4sAU6-oSQprzcOkCxEOJ10Up_uBCu5AbgiVdGu5TkhvFczzoXP0XG_OA97-0OhMOGaiiPuVdXC18I3n0S3BINsi-ACDL0rMNZpzNhhvVbOx04SocJVITNfe8goZw9G-hN5aSsIt0LABm8pZ3CLWGW6_VXymIgkt9NZnennkno46PDVF3', status: 'active' },
    { id: '5', name: 'Sofía López', email: 'sofia.lopez@constructora.com', role: 'Diseñadora de Interiores', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHGf4gAfEwTPdyWzwAOsxDK79p794RLyMcv6CPcqPTj8RMMC8QJOX9zomSiSWkICf4SrOlaBU0FOT0w7ySI40uwJ7ZD3bqf9k7SpeLQaCTjWaDqZp1sj2YAjDo_MNVESUI5awfnAWWnqSLginrDU_JeUKoPyZMsyRqme7QFKiB5apbJ2YN1Pe0Z3IbmGud4poLudUEO-EWOKEFLktd409q58U-y2JhellLTVJN1QFkpa5lcExNSRLmDoVr1h8lzbFDUdRjfMpqG-KX', status: 'inactive' },
  ]);

  openCreateModal() {
    this.employeeForm.reset({
      name: '',
      role: '',
      avatarUrl: '',
      status: 'active',
      email: ''
    });
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...this.employeeForm.value
    };

    this.employees.update(employees => [...employees, newEmployee]);
    this.closeModal();
  }
}