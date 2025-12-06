import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  // FIX: Explicitly type `fb` as `FormBuilder` to fix type inference issue.
  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['admin@constructora.com', [Validators.required, Validators.email]],
    password: ['password123', Validators.required],
  });

  onSubmit() {
    this.loginError.set(null);
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    const user = this.authService.login(email!, password!);

    if (user) {
      switch (user.role) {
        case 'admin':
          this.router.navigate(['/metrics']);
          break;
        case 'employee':
          this.router.navigate(['/employee-dashboard']);
          break;
        case 'accountant':
          this.router.navigate(['/finances']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    } else {
      this.loginError.set('Correo electrónico o contraseña incorrectos.');
    }
  }
}