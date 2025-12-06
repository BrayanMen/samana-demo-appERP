import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'employees/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'employees/:id/assign-tools',
    renderMode: RenderMode.Server,
  },
  {
    path: 'works/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'works/:id/team',
    renderMode: RenderMode.Server,
  },
  {
    path: 'works/:id/assign-tools',
    renderMode: RenderMode.Server,
  },
  {
    path: 'inventory/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'finances/obra/:id',
   renderMode: RenderMode.Server,
  },
  {
    path: 'incidents/:id',
    renderMode: RenderMode.Server,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
