import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'employees/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'employees/:id/assign-tools',
    renderMode: RenderMode.Client,
  },
  {
    path: 'works/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'works/:id/team',
    renderMode: RenderMode.Client,
  },
  {
    path: 'works/:id/assign-tools',
    renderMode: RenderMode.Client,
  },
  {
    path: 'inventory/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'finances/obra/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'incidents/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
