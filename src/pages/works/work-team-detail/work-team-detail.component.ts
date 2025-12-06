import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  avatarUrl: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-work-team-detail',
  templateUrl: './work-team-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class WorkTeamDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  workId = signal<string | null>(null);
  teamMembers = signal<TeamMember[]>([]);

  // Mock data for all teams
  private allTeamsData: { [key: string]: TeamMember[] } = {
    'Remodelación Av. Principal': [
      { name: 'Carlos Rodriguez', role: 'Jefe de Obra', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m', phone: '+34 123 456 789', email: 'c.rodriguez@constructora.com' },
      { name: 'Lucia Fernandez', role: 'Electricista', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnITCX7Ck6ggZYA1_Y_leS9kB3Bw6Ev3WYa4CNMeUl6_f2wTp7iU0AeYICYMLFvdRoK2LoyFd-p6QMb71br8UUTdpsijy5WOi4zI8KoPnYBLEWN9YXtuTJQZAb11KKpWNP05rGS4mWlyxS4fW15sozf0S5YNoBb3eMwpDE-_HiqlE2DIRzsRI-veq7nwgBX_Fy0z5pSE9H7MXK4c4d0LrAa9MR2UbK5L4gZplmyPg1F2fcBXMF6lWp1atf9P01nT-up6pXEDy2pdyL', phone: '+34 234 567 890', email: 'l.fernandez@constructora.com' },
      { name: 'Javier Martinez', role: 'Fontanero', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMEQAOxCRrmqDpO2Nj8pM_TRV7dLGEr88qNzr6tADhCcI4kD7xzyQk2HLf7Of6k5Xqay5ri6BgblkTMLpkC7zIQYMFw-E4sAU6-oSQprzcOkCxEOJ10Up_uBCu5AbgiVdGu5TkhvFczzoXP0XG_OA97-0OhMOGaiiPuVdXC18I3n0S3BINsi-ACDL0rMNZpzNhhvVbOx04SocJVITNfe8goZw9G-hN5aSsIt0LABm8pZ3CLWGW6_VXymIgkt9NZnennkno46PDVF3', phone: '+34 345 678 901', email: 'j.martinez@constructora.com' },
    ],
    'Cocina Familia Pérez': [
      { name: 'Ana García', role: 'Arquitecta Principal', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmNrGAccZUMUu4IPIWuJxRWcUUOLy2b_Hu7DwM5FqvCHAJ8rOLYPmBLpnXUMsT2ok8BMLyXYtZDcbegbqf1GN-wbyS0r1VuQ0n9xex14Qxr5Z6ltnAgWkbFFKnIbpC3Ql91ay_AeQLr-LIyTCJSpByX-tXnNA90yICjpXV5SlZ0z30RYkrRoQ5IpYvNVqsG3ZIHM_HUF8XmqHGFlOzx2Pdct6Pa1Z17bG_GotB2_jyzZLhJOy9Cw34xT5VyLcApXDPCFWXvhXf--F', phone: '+34 456 789 012', email: 'a.garcia@constructora.com' },
      { name: 'Javier Martinez', role: 'Fontanero', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMEQAOxCRrmqDpO2Nj8pM_TRV7dLGEr88qNzr6tADhCcI4kD7xzyQk2HLf7Of6k5Xqay5ri6BgblkTMLpkC7zIQYMFw-E4sAU6-oSQprzcOkCxEOJ10Up_uBCu5AbgiVdGu5TkhvFczzoXP0XG_OA97-0OhMOGaiiPuVdXC18I3n0S3BINsi-ACDL0rMNZpzNhhvVbOx04SocJVITNfe8goZw9G-hN5aSsIt0LABm8pZ3CLWGW6_VXymIgkt9NZnennkno46PDVF3', phone: '+34 345 678 901', email: 'j.martinez@constructora.com' },
    ],
    'Baños Oficentro Corp': [
       { name: 'Carlos Rodriguez', role: 'Jefe de Obra', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m', phone: '+34 123 456 789', email: 'c.rodriguez@constructora.com' },
    ]
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.workId.set(id);
      if (id && this.allTeamsData[id]) {
        this.teamMembers.set(this.allTeamsData[id]);
      } else {
        this.teamMembers.set([]);
      }
    });
  }
}