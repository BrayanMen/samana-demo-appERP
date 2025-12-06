import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class BottomNavComponent {
  navItems = signal([
    { path: '/metrics', icon: 'dashboard', label: 'Dashboard' },
    { path: '/employees', icon: 'groups', label: 'Empleados' },
    { path: '/works', icon: 'construction', label: 'Obras' },
    { path: '/inventory', icon: 'inventory_2', label: 'Inventario' },
    { path: '/finances', icon: 'account_balance_wallet', label: 'Finanzas' },
  ]);
}