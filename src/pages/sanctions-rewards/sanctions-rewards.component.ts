import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Employee {
  name: string;
  role: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-sanctions-rewards',
  templateUrl: './sanctions-rewards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class SanctionsRewardsComponent {
  employees = signal<Employee[]>([
      { name: 'Alejandro Vargas', role: 'Diseñador Principal', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_v2E6gdKm7FBJhg_S1Wia-v6KTYpL79JjzFwvYHlp4JyeCiengfxTJ0Q9BlejveWnVEuz3YPyJOzVloefuJrW6KGa3loVH_CQF2dPMAuRdd1iXXshp7dfG5ejaroY3MvfmZlw-c6fei1anJMKc8dwv1zAeKkJSzXnn01EDjK9_Y207JsryCZodRy0yTdZxZKtROkpCJLbKLZBT_rFxtSwhToqQFK6Jl9W87YRnVPw5SnT6Oktzl9V_FyPVeG5vFh2D2e4ibNVKr6m' },
      { name: 'Beatriz Mendoza', role: 'Jefa de Obra', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfmNrGAccZUMUu4IPIWuJxRWcUUOLy2b_Hu7DwM5FqvCHAJ8rOLYPmBLpnXUMsT2ok8BMLyXYtZDcbegbqf1GN-wbyS0r1VuQ0n9xex14Qxr5Z6ltnAgWkbFFKnIbpC3Ql91ay_AeQLr-LIyTCJSpByX-tXnNA90yICjpXV5SlZ0z30RYkrRoQ5IpYvNVqsG3ZIHM_HUF8XmqHGFlOzx2Pdct6Pa1Z17bG_GotB2_jyzZLhJOy9Cw34xT5VyLcApXDPCFWXvhXf--F' },
      { name: 'Carlos Sánchez', role: 'Arquitecto', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMEQAOxCRrmqDpO2Nj8pM_TRV7dLGEr88qNzr6tADhCcI4kD7xzyQk2HLf7Of6k5Xqay5ri6BgblkTMLpkC7zIQYMFw-E4sAU6-oSQprzcOkCxEOJ10Up_uBCu5AbgiVdGu5TkhvFczzoXP0XG_OA97-0OhMOGaiiPuVdXC18I3n0S3BINsi-ACDL0rMNZpzNhhvVbOx04SocJVITNfe8goZw9G-hN5aSsIt0LABm8pZ3CLWGW6_VXymIgkt9NZnennkno46PDVF3' },
      { name: 'Diana Reyes', role: 'Gerente de Proyectos', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnITCX7Ck6ggZYA1_Y_leS9kB3Bw6Ev3WYa4CNMeUl6_f2wTp7iU0AeYICYMLFvdRoK2LoyFd-p6QMb71br8UUTdpsijy5WOi4zI8KoPnYBLEWN9YXtuTJQZAb11KKpWNP05rGS4mWlyxS4fW15sozf0S5YNoBb3eMwpDE-_HiqlE2DIRzsRI-veq7nwgBX_Fy0z5pSE9H7MXK4c4d0LrAa9MR2UbK5L4gZplmyPg1F2fcBXMF6lWp1atf9P01nT-up6pXEDy2pdyL' },
  ]);
}
