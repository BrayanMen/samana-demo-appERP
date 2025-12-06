import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

interface Task {
  id: string;
  name: string;
  dueDate: string;
  completed: boolean;
  assignedTo?: string; // employeeId
}

interface Activity {
  icon: string;
  description: string;
  timestamp: string;
}

interface Evidence {
  url: string;
  type: 'image' | 'video';
  description: string;
  uploaderName: string;
  date: string;
}

interface Work {
  title: string;
  deadline: string;
  status: 'En Progreso' | 'Retrasada' | 'Completada' | 'Pausada';
  timeline: string;
  budget: string;
  quality: number;
  dailyProgressActionable: boolean;
  assignedTeamIds: string[];
  tasks: Task[];
  activity?: Activity[];
  evidence?: Evidence[];
}

interface Employee {
  id: string;
  name: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
})
export class WorkDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  
  workDetails = signal<Work | undefined>(undefined);
  isModalOpen = signal(false);
  isStatusDropdownOpen = signal(false);
  isAssignModalOpen = signal(false);
  isTaskModalOpen = signal(false);
  editingTask = signal<Task | null>(null);

  isEvidenceModalOpen = signal(false);
  selectedEvidence = signal<Evidence | null>(null);

  availableStatuses = signal<Work['status'][]>(['En Progreso', 'Retrasada', 'Completada', 'Pausada']);

  transactionForm = this.fb.group({
    type: ['income', Validators.required],
    description: ['', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    date: ['', Validators.required],
  });
  
  taskForm = this.fb.group({
    name: ['', Validators.required],
    dueDate: ['', Validators.required],
    assignedTo: [''],
  });

  assignmentForm: FormGroup = this.fb.group({});

  allEmployees = signal<Employee[]>([
    { id: '1', name: 'Ana García', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmNrGAccZUMUu4IPIWuJxRWcUUOLy2b_Hu7DwM5FqvCHAJ8rOLYPmBLpnXUMsT2ok8BMLyXYtZDcbegbqf1GN-wbyS0r1VuQ0n9xex14Qxr5Z6ltnAgWkbFFKnIbpC3Ql91ay_AeQLr-LIyTCJSpByX-tXnNA90yICjpXV5SlZ0z30RYkrRoQ5IpYvNVqsG3ZIHM_HUF8XmqHGFlOzx2Pdct6Pa1Z17bG_GotB2_jyzZLhJOy9Cw34xT5VyLcApXDPCFWXvhXf--F'},
    { id: '2', name: 'Carlos Rodriguez', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m' },
    { id: '3', name: 'Lucia Fernandez', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnITCX7Ck6ggZYA1_Y_leS9kB3Bw6Ev3WYa4CNMeUl6_f2wTp7iU0AeYICYMLFvdRoK2LoyFd-p6QMb71br8UUTdpsijy5WOi4zI8KoPnYBLEWN9YXtuTJQZAb11KKpWNP05rGS4mWlyxS4fW15sozf0S5YNoBb3eMwpDE-_HiqlE2DIRzsRI-veq7nwgBX_Fy0z5pSE9H7MXK4c4d0LrAa9MR2UbK5L4gZplmyPg1F2fcBXMF6lWp1atf9P01nT-up6pXEDy2pdyL' },
    { id: '4', name: 'Javier Martinez', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMEQAOxCRrmqDpO2Nj8pM_TRV7dLGEr88qNzr6tADhCcI4kD7xzyQk2HLf7Of6k5Xqay5ri6BgblkTMLpkC7zIQYMFw-E4sAU6-oSQprzcOkCxEOJ10Up_uBCu5AbgiVdGu5TkhvFczzoXP0XG_OA97-0OhMOGaiiPuVdXC18I3n0S3BINsi-ACDL0rMNZpzNhhvVbOx04SocJVITNfe8goZw9G-hN5aSsIt0LABm8pZ3CLWGW6_VXymIgkt9NZnennkno46PDVF3' },
  ]);

  private allWorksData: Work[] = [
    { 
      title: 'Remodelación Av. Principal', 
      deadline: 'Finaliza en 12 días', 
      status: 'En Progreso', 
      timeline: 'A tiempo', 
      budget: '$18k / $20k', 
      quality: 98, 
      dailyProgressActionable: true, 
      assignedTeamIds: ['2', '3'],
      tasks: [
        { id: 't1', name: 'Instalación de piso flotante', dueDate: '2024-08-01', completed: true, assignedTo: '2' },
        { id: 't2', name: 'Pintura de muros', dueDate: '2024-08-05', completed: true, assignedTo: '3' },
        { id: 't3', name: 'Instalación de luminarias', dueDate: '2024-08-08', completed: true, assignedTo: '3' },
        { id: 't4', name: 'Revisión final', dueDate: '2024-08-10', completed: false, assignedTo: '2' },
      ],
      activity: [
        { icon: 'done_all', description: 'Tarea "Pintura de muros" completada.', timestamp: 'Hace 1 día' },
        { icon: 'upload', description: 'Carlos Rodriguez subió 3 fotos de avance.', timestamp: 'Hace 2 días' },
        { icon: 'add_task', description: 'Se añadió la tarea "Revisión final".', timestamp: 'Hace 3 días' },
      ],
      evidence: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9hJ7M0keBXR6Xhz6rjMnVelKEy6t3KN4wDyTlogvdJPjgbGFPbXPTVs-8okTYHfB4pG3oNJDi74fTM6i2jzwYB3t3aDLMuB0Hk8AbaCngtAUe3TF3RchxhXhCJBstT1dv_ZSHyoM_JEt4xAT9hqCtO-mJQcReEApEq4D6p36WqLVFWCXwZc_y9DmwuOCghW2gn8eiY_NoXr-EZHcg-IJ4To2nZ79XcF-SCI9oeONXkvcqqJVWzIzsqTjxkBOFNi5rG67HlYW7QjPA', type: 'image', description: 'Instalación de la nueva grifería de cocina. Se realizaron pruebas de fugas.', uploaderName: 'Carlos Rodriguez', date: '2024-07-25' },
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPLKUeUZv5y6Xt5ZipeilgG3LNM0tYoaW5btoC8VBt3YChsaWNOirKZByiYTwcfFvv7TEP3YqCS39mzCushRE1GpmMkqQdIAlTpE69MmShqh4bDGSQ0sxk9UCF9110uwvcNooG-TGBbyPQJmec8lKIXb5VSPVeYB3GaQDY2ijuZQFZ2OrkI_3XM-NuwWklKqSct7nRhsxlZVmzrLoXQXJKKHlgUHe_ojUWiexlN0-eGfQ_j8QUVV6AsnRW7j9c1JbBkGqC4sqqH8b_', type: 'image', description: 'Pintura finalizada en la pared principal de la sala.', uploaderName: 'Lucia Fernandez', date: '2024-07-24' },
      ]
    },
    { 
      title: 'Cocina Familia Pérez', 
      deadline: 'Finaliza en 25 días', 
      status: 'Retrasada', 
      timeline: '-3 días', 
      budget: '$4.5k / $8k', 
      quality: 92, 
      dailyProgressActionable: true, 
      assignedTeamIds: ['1', '4'],
       tasks: [
        { id: 't5', name: 'Demolición de azulejos', dueDate: '2024-07-20', completed: true, assignedTo: '4' },
        { id: 't6', name: 'Plomería nueva', dueDate: '2024-07-25', completed: true, assignedTo: '4' },
        { id: 't7', name: 'Instalación de gabinete', dueDate: '2024-08-01', completed: false, assignedTo: '1' },
        { id: 't8', name: 'Instalación de encimera', dueDate: '2024-08-05', completed: false, assignedTo: '1' },
        { id: 't9', name: 'Conexión de electrodomésticos', dueDate: '2024-08-10', completed: false, assignedTo: '3' },
      ],
      activity: [
        { icon: 'warning', description: 'El plazo de la tarea "Plomería nueva" fue extendido.', timestamp: 'Hace 4 horas' },
        { icon: 'receipt_long', description: 'Ana García registró un gasto de $150 en materiales.', timestamp: 'Ayer' },
      ],
      evidence: []
    },
    { 
      title: 'Baños Oficentro Corp', 
      deadline: 'Finalizada', 
      status: 'Completada', 
      timeline: '+2 días', 
      budget: '$16k / $15k', 
      quality: 95, 
      dailyProgressActionable: false, 
      assignedTeamIds: ['2'],
       tasks: [
        { id: 't10', name: 'Cambio de tuberías', dueDate: '2024-07-01', completed: true },
        { id: 't11', name: 'Instalación de nuevos sanitarios', dueDate: '2024-07-05', completed: true },
        { id: 't12', name: 'Colocación de cerámica', dueDate: '2024-07-10', completed: true },
        { id: 't13', name: 'Instalación de grifería', dueDate: '2024-07-12', completed: true },
      ],
      activity: [
         { icon: 'flag', description: 'Obra marcada como "Completada".', timestamp: 'Hace 5 días' },
         { icon: 'done_all', description: 'Todas las tareas han sido completadas.', timestamp: 'Hace 5 días' },
      ],
      evidence: []
    },
  ];

  workProgress = computed(() => {
    const work = this.workDetails();
    if (!work || work.tasks.length === 0) return 0;
    const completedTasks = work.tasks.filter(t => t.completed).length;
    return Math.round((completedTasks / work.tasks.length) * 100);
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const workId = params.get('id');
      if (workId) {
        const data = this.allWorksData.find(work => work.title === workId);
        this.workDetails.set(data);
        if (data) {
          this.setupAssignmentForm(data.assignedTeamIds);
        }
      }
    });
  }

  setupAssignmentForm(assignedIds: string[]) {
    const controls: { [key: string]: any } = {};
    this.allEmployees().forEach(employee => {
      controls[employee.id] = this.fb.control(assignedIds.includes(employee.id));
    });
    this.assignmentForm = this.fb.group(controls);
  }

  openModal() { this.isModalOpen.set(true); }
  closeModal() {
    this.isModalOpen.set(false);
    this.transactionForm.reset({ type: 'income' });
  }

  toggleStatusDropdown() { this.isStatusDropdownOpen.update(v => !v); }
  selectStatus(status: Work['status']) {
    this.workDetails.update(work => work ? { ...work, status } : undefined);
    this.isStatusDropdownOpen.set(false);
  }

  openAssignModal() { this.isAssignModalOpen.set(true); }
  closeAssignModal() { this.isAssignModalOpen.set(false); }

  onSubmitTransaction() { /* ... */ }

  onSubmitAssignments() { /* ... */ }
  
  // Task Methods
  openCreateTaskModal() {
    this.editingTask.set(null);
    this.taskForm.reset();
    this.isTaskModalOpen.set(true);
  }

  openEditTaskModal(task: Task) {
    this.editingTask.set(task);
    this.taskForm.setValue({
      name: task.name,
      dueDate: task.dueDate,
      assignedTo: task.assignedTo || ''
    });
    this.isTaskModalOpen.set(true);
  }

  closeTaskModal() {
    this.isTaskModalOpen.set(false);
    this.editingTask.set(null);
  }

  saveTask() {
    if (!this.taskForm.valid) return;
    
    const taskData = this.taskForm.value;
    const editing = this.editingTask();

    this.workDetails.update(work => {
      if (!work) return undefined;
      let updatedTasks;
      if (editing) { // Update existing task
        updatedTasks = work.tasks.map(t => 
          t.id === editing.id ? { ...t, name: taskData.name!, dueDate: taskData.dueDate!, assignedTo: taskData.assignedTo! } : t
        );
      } else { // Add new task
        const newTask: Task = {
          id: `t${Date.now()}`,
          completed: false,
          name: taskData.name!,
          dueDate: taskData.dueDate!,
          assignedTo: taskData.assignedTo!,
        };
        updatedTasks = [...work.tasks, newTask];
      }
      return { ...work, tasks: updatedTasks };
    });

    this.closeTaskModal();
  }

  deleteTask(taskId: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;
    this.workDetails.update(work => {
      if (!work) return undefined;
      const updatedTasks = work.tasks.filter(t => t.id !== taskId);
      return { ...work, tasks: updatedTasks };
    });
  }

  toggleTaskStatus(taskId: string) {
    this.workDetails.update(work => {
      if (!work) return undefined;
      const updatedTasks = work.tasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      return { ...work, tasks: updatedTasks };
    });
  }

  // Evidence Modal Methods
  openEvidenceModal(evidence: Evidence) {
    this.selectedEvidence.set(evidence);
    this.isEvidenceModalOpen.set(true);
  }

  closeEvidenceModal() {
    this.isEvidenceModalOpen.set(false);
    this.selectedEvidence.set(null);
  }

  assignTools() {
    const workId = this.workDetails()?.title;
    if (workId) {
      this.router.navigate(['/works', workId, 'assign-tools']);
    }
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.allEmployees().find(e => e.id === id);
  }

  getTimelineClass(timeline: string) {
    if (timeline.startsWith('-')) return 'text-yellow-400';
    if (timeline.startsWith('+')) return 'text-green-400';
    if (timeline === 'A tiempo') return 'text-green-400';
    return 'text-white';
  }

  getStatusClass(status: Work['status']) {
    switch (status) {
      case 'En Progreso': return 'bg-blue-500/20 text-blue-300';
      case 'Retrasada': return 'bg-yellow-500/20 text-yellow-300';
      case 'Completada': return 'bg-green-500/20 text-green-300';
      case 'Pausada': return 'bg-gray-500/20 text-gray-300';
    }
  }
}