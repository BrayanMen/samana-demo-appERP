import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface AssignedWork {
  title: string;
  client: string;
  status: 'En Progreso' | 'Próxima';
  icon: string;
}

interface AssignedTool {
  name: string;
  icon: string;
}

interface LoanHistory {
  toolName: string;
  project: string;
  date: string;
  status: 'Devuelto' | 'Pendiente';
  icon: string;
}


interface EmployeeDetail {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  email: string;
  phone: string;
  employeeId: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
  assignedWorks: AssignedWork[];
  assignedTools: AssignedTool[];
  loanHistory: LoanHistory[];
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class EmployeeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employee = signal<EmployeeDetail | undefined>(undefined);

  // Mock data - in a real app, this would be in a service
  private allEmployeesData: EmployeeDetail[] = [
     {
      id: '1',
      name: 'Ana García',
      role: 'Arquitecta Principal',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmNrGAccZUMUu4IPIWuJxRWcUUOLy2b_Hu7DwM5FqvCHAJ8rOLYPmBLpnXUMsT2ok8BMLyXYtZDcbegbqf1GN-wbyS0r1VuQ0n9xex14Qxr5Z6ltnAgWkbFFKnIbpC3Ql91ay_AeQLr-LIyTCJSpByX-tXnNA90yICjpXV5SlZ0z30RYkrRoQ5IpYvNVqsG3ZIHM_HUF8XmqHGFlOzx2Pdct6Pa1Z17bG_GotB2_jyzZLhJOy9Cw34xT5VyLcApXDPCFWXvhXf--F',
      email: 'a.garcia@constructora.com',
      phone: '+34 600 111 222',
      employeeId: 'EMP-123456',
      attendance: { present: 22, absent: 0, late: 1 },
      assignedWorks: [
        { title: 'Cocina Familia Pérez', client: 'Familia Pérez', status: 'En Progreso', icon: 'foundation' }
      ],
      assignedTools: [
        { name: 'Nivel Láser Autonivelante', icon: 'square_foot' },
      ],
      loanHistory: [
        { toolName: 'Nivel Láser Autonivelante', project: 'Cocina Familia Pérez', date: '15/07/2024', status: 'Pendiente', icon: 'square_foot' },
        { toolName: 'Taladro Percutor', project: 'Oficinas Centrales', date: '02/07/2024', status: 'Devuelto', icon: 'construction' },
      ]
    },
    {
      id: '2',
      name: 'Carlos Rodriguez',
      role: 'Jefe de Obra',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m',
      email: 'c.rodriguez@constructora.com',
      phone: '+34 123 456 789',
      employeeId: 'EMP-789012',
      attendance: { present: 20, absent: 1, late: 2 },
      assignedWorks: [
        { title: 'Remodelación Oficinas Centrales', client: 'Corporativo Alfa', status: 'En Progreso', icon: 'foundation' },
        { title: 'Residencial Vista Hermosa', client: 'Inmobiliaria Sol', status: 'Próxima', icon: 'apartment' },
      ],
      assignedTools: [
        { name: 'Taladro Percutor Inalámbrico', icon: 'construction' },
        { name: 'Juego de Llaves Allen', icon: 'hardware' },
        { name: 'Nivel Láser Autonivelante', icon: 'square_foot' },
      ],
      loanHistory: [
         { toolName: 'Taladro Percutor Inalámbrico', project: 'Oficinas Centrales', date: '18/07/2024', status: 'Pendiente', icon: 'construction' },
         { toolName: 'Juego de Llaves Allen', project: 'Oficinas Centrales', date: '18/07/2024', status: 'Pendiente', icon: 'hardware' },
         { toolName: 'Cinta Métrica', project: 'Residencial Vista Hermosa', date: '12/07/2024', status: 'Devuelto', icon: 'square_foot' },
      ]
    },
    // Add other employees here...
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('id');
      if (employeeId) {
        const data = this.allEmployeesData.find(emp => emp.id === employeeId) ?? this.allEmployeesData[1]; // Fallback to Carlos
        this.employee.set(data);
      }
    });
  }

  assignTool() {
    const employeeId = this.employee()?.id;
    if (employeeId) {
      this.router.navigate(['/employees', employeeId, 'assign-tools']);
    }
  }

  removeTool(toolNameToRemove: string) {
    this.employee.update(emp => {
        if (!emp) return undefined;
        
        emp.assignedTools = emp.assignedTools.filter(tool => tool.name !== toolNameToRemove);
        return { ...emp }; // Return new object to trigger change detection
    });
    alert(`Herramienta "${toolNameToRemove}" quitada.`);
  }

  getWorkStatusClass(status: 'En Progreso' | 'Próxima') {
    return status === 'En Progreso' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400';
  }

  getLoanStatusClass(status: 'Devuelto' | 'Pendiente') {
    return status === 'Devuelto' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400';
  }
}