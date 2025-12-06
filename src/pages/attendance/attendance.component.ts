import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class AttendanceComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  
  time = signal('00:00:00');
  userName = signal('');
  currentDate = signal('');

  private timerId: any;

  ngOnInit() {
    this.userName.set(this.authService.getCurrentUser()?.name || 'Empleado');
    this.updateDate();
    
    // Start timer
    this.timerId = setInterval(() => this.updateTime(), 1000);
    this.updateTime(); // Initial call
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateTime() {
    const now = new Date();
    // Using a fixed time that increments for demonstration, as a real-time clock might not be the primary focus.
    // Let's make a simple incrementing clock starting from a fixed time.
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    this.time.set(
      `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`
    );
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  private updateDate() {
     const now = new Date();
     this.currentDate.set(now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }));
  }
}
