import { Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { EmployeesComponent } from '../pages/employees/employees.component';
import { WorksComponent } from '../pages/works/works.component';
import { InventoryComponent } from '../pages/inventory/inventory.component';
import { FinancesComponent } from '../pages/finances/finances.component';
import { ObraFinancesDetailComponent } from '../pages/finances/obra-finances-detail/obra-finances-detail.component';
import { SanctionsRewardsComponent } from '../pages/sanctions-rewards/sanctions-rewards.component';
import { WorkDetailComponent } from '../pages/works/work-detail/work-detail.component';
import { WorkTeamDetailComponent } from '../pages/works/work-team-detail/work-team-detail.component';
import { EmployeeDetailComponent } from '../pages/employees/employee-detail/employee-detail.component';
import { LoginComponent } from '../pages/login/login.component';
import { EmployeeDashboardComponent } from '../pages/employee-dashboard/employee-dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { AttendanceComponent } from '../pages/attendance/attendance.component';
import { UploadEvidenceComponent } from '../pages/upload-evidence/upload-evidence.component';
import { ReportIncidentComponent } from '../pages/report-incident/report-incident.component';
import { RequestMaterialComponent } from '../pages/request-material/request-material.component';
import { RegisterExpenseComponent } from '../pages/register-expense/register-expense.component';
import { PayrollComponent } from '../pages/payroll/payroll.component';
import { CreateWorkComponent } from '../pages/works/create-work/create-work.component';
import { IncidentsComponent } from '../pages/incidents/incidents.component';
import { IncidentDetailComponent } from '../pages/incidents/incident-detail/incident-detail.component';
import { InventoryDetailComponent } from '../pages/inventory/inventory-detail/inventory-detail.component';
import { NewItemComponent } from '../pages/inventory/new-item/new-item.component';
import { StockEntryComponent } from '../pages/inventory/stock-entry/stock-entry.component';
import { StockExitComponent } from '../pages/inventory/stock-exit/stock-exit.component';
import { StockReturnComponent } from '../pages/inventory/stock-return/stock-return.component';
import { StockLossComponent } from '../pages/inventory/stock-loss/stock-loss.component';
import { BudgetsComponent } from '../pages/budgets/budgets.component';
import { MetricsComponent } from '../pages/metrics/metrics.component';
import { AssignToolsToEmployeeComponent } from '../pages/employees/assign-tools-to-employee/assign-tools-to-employee.component';
import { AssignToolsToWorkComponent } from '../pages/works/assign-tools-to-work/assign-tools-to-work.component';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'metrics', component: MetricsComponent, canActivate: [authGuard] },
  { path: 'budgets', component: BudgetsComponent, canActivate: [authGuard] },
  { path: 'dashboard', redirectTo: 'metrics', pathMatch: 'full' },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [authGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [authGuard] },
  { path: 'upload-evidence', component: UploadEvidenceComponent, canActivate: [authGuard] },
  { path: 'report-incident', component: ReportIncidentComponent, canActivate: [authGuard] },
  { path: 'request-material', component: RequestMaterialComponent, canActivate: [authGuard] },
  { path: 'register-expense', component: RegisterExpenseComponent, canActivate: [authGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  {
    path: 'employees/:id/assign-tools',
    component: AssignToolsToEmployeeComponent,
    canActivate: [authGuard],
  },
  { path: 'works', component: WorksComponent, canActivate: [authGuard] },
  { path: 'works/new', component: CreateWorkComponent, canActivate: [authGuard] },
  { path: 'works/:id', component: WorkDetailComponent, canActivate: [authGuard] },
  { path: 'works/:id/team', component: WorkTeamDetailComponent, canActivate: [authGuard] },
  {
    path: 'works/:id/assign-tools',
    component: AssignToolsToWorkComponent,
    canActivate: [authGuard],
  },

  // Inventory Routes
  { path: 'inventory', component: InventoryComponent, canActivate: [authGuard] },
  { path: 'inventory/new', component: NewItemComponent, canActivate: [authGuard] },
  { path: 'inventory/stock-entry', component: StockEntryComponent, canActivate: [authGuard] },
  { path: 'inventory/stock-exit', component: StockExitComponent, canActivate: [authGuard] },
  { path: 'inventory/stock-return', component: StockReturnComponent, canActivate: [authGuard] },
  { path: 'inventory/stock-loss', component: StockLossComponent, canActivate: [authGuard] },
  { path: 'inventory/:id', component: InventoryDetailComponent, canActivate: [authGuard] },

  { path: 'finances', component: FinancesComponent, canActivate: [authGuard] },
  { path: 'finances/obra/:id', component: ObraFinancesDetailComponent, canActivate: [authGuard] },
  { path: 'sanctions-rewards', component: SanctionsRewardsComponent, canActivate: [authGuard] },
  { path: 'payroll', component: PayrollComponent, canActivate: [authGuard] },
  { path: 'incidents', component: IncidentsComponent, canActivate: [authGuard] },
  { path: 'incidents/:id', component: IncidentDetailComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
