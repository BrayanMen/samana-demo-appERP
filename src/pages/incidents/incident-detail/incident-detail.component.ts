import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface IncidentPhoto {
  url: string;
  alt: string;
}

interface IncidentComment {
  author: string;
  timestamp: string;
  comment: string;
}

interface IncidentDetail {
  id: string;
  title: string;
  status: 'Abierta' | 'En Proceso' | 'Resuelta';
  reportDate: string;
  photos: IncidentPhoto[];
  description: string;
  obra: string;
  reporter: string;
  responsible: string | null;
  comments: IncidentComment[];
}


@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class IncidentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  incident = signal<IncidentDetail | undefined>(undefined);

  private allIncidents: IncidentDetail[] = [
    {
      id: '5',
      title: 'Fuga de agua en baño principal',
      status: 'Abierta',
      reportDate: '24 de Julio',
      photos: [
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMgQdFTmZDPujQPP9J5bINcgA7OLmwBcr5GumMIVpVBHBF0P75EMLz-G8lN998iK2Sqw4CTHRIz4SidSONvHv67rWZzkPTMDF2UBHAF5Nj90p8ndR_6-yc3XbMMQXyR90nzM9KBKLTjbHSUmvH3mqmY0RvsqJPfAZBqi74hCo2k10lQ35a2xI-XZmErLfS6_Au5Jqgdva9CJPNPwCWO24ol4RvmgtWTscu9G5Ux6ftjJ3TncIgdivM7eBuoagjJXkv6qsVVNBHBcTy', alt: 'Leaking pipe under a bathroom sink.' },
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMy-aRxbUiNnzpbHbzh3BrMB4Ak7ZYxiF68b31MRbESkP1UTJdefzV2FFCM9TVqq5zpA8pDZguMagBU7u8mLS7saGLy5JkEDmHukLBgnUxx0G5Nxcw0HsaGPftxFN47Ty_exmn2-jN26fkmPo2UaaOfdVNx5Bj9_7Y5xC2kxfpmqDZJpXAzNH9spTQijTdmD_Qu3fqTH7LWRJslS1Pl3AjBShDhpVFQ8qgxnQUgfgB9T4y60wKSFwglG05oZPmFmvAEIrL7Ljc6abm', alt: 'Water damage on the floor of a cabinet.' },
        { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4N5mCYNYvjS4ymkSKWn68MIo7q-r8B74XkoU99hK8tZFkNY-GzHAsC8Ld34VBObQ4MXZqXmlmi-3zkAe8OhZZ9ulgMhmb0tz_khcYqYTXa-HiYoq61iG0S0a3B5N6TcrJ32I3-fXYBQa1IydeOhUP2N42i9HY_fexZVPErRarKshhHKI0vEGZzwa4DE6pzHL6oAqTyhHfCBsLpphwL9Mu5vyrdyeNXDCc0_VJiO5CHVlS7lRoIYH2SReER1f2qNXFcFrKp9ekQCmC', alt: 'Close up of a dripping pipe connection.' },
      ],
      description: 'Se ha detectado una fuga de agua constante debajo del lavabo del baño principal en el segundo piso. La fuga parece originarse en la junta de la tubería de desagüe y ha comenzado a dañar el mueble del tocador.',
      obra: 'Residencia Miller',
      reporter: 'Juan Pérez',
      responsible: null,
      comments: [
        { author: 'Admin', timestamp: 'hace 2 horas', comment: 'Estado cambiado de Abierta a En Proceso.' },
        { author: 'Juan Pérez', timestamp: 'hace 1 día', comment: 'Acabo de subir las fotos de la fuga. Parece que viene de la rosca principal del desagüe.' },
      ]
    },
    // Other incidents would be here
  ];
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // Find the incident by id, fallback to the first one for demo
        const incidentData = this.allIncidents.find(i => i.id === id) ?? this.allIncidents[0];
        this.incident.set(incidentData);
      }
    });
  }

  getStatusClass(status: 'Abierta' | 'En Proceso' | 'Resuelta') {
    switch(status) {
      case 'Abierta': return 'bg-orange-500/20 text-orange-400';
      case 'En Proceso': return 'bg-blue-500/20 text-blue-300';
      case 'Resuelta': return 'bg-green-500/20 text-green-400';
    }
  }
}