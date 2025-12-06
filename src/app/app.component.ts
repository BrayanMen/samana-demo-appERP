import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { BottomNavComponent } from '../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet,BottomNavComponent, CommonModule],
})
export class AppComponent {
  authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;
}
