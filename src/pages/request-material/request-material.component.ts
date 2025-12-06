import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Material {
  id: number;
  name: string;
  stock: number;
  unit: string;
  imageUrl: string;
  requestedQuantity: number;
}

@Component({
  selector: 'app-request-material',
  templateUrl: './request-material.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class RequestMaterialComponent {
  searchTerm = signal('');

  allMaterials = signal<Material[]>([
    { id: 1, name: 'Ladrillo Fiscal', stock: 150, unit: 'Unidades', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCemHcbo7mFMU7KgsJO_mzriRm9wvg7CcL-xw6M7iJmSP87qqFFIU28b1e3Fk3QTMHS662pp6WbRFr_dTQoUQCIKOkb1J1Ju585reMzkqw8iArgCEQylsagu_Z1NgsmDGb6BJyvMK6T5bjikqpJk9qe1-aqetmcZC8fS7LWMatzXapsUjKfoFIetbeWtLQJTuHhNDZCuHiFJWpqae1HHR3g7uhKExLIdoFfqnd_3s8kvHgR-xkz-idvehQizyeMYxA5yJnXYsJLBo1F', requestedQuantity: 0 },
    { id: 2, name: 'Cemento Portland', stock: 45, unit: 'Sacos', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBuWunERrBjxYvnEJjhsTSca2ZzWi50yv21Lu2RSZav5Gvk_96VPsAMIRfEwX4hSD5wjFLyMvo80mCDNjBRJzjD_jtQDIU8Jpe1J5Y7roC-TObnjDvirfZqCyfUX7hhrHHJxlKremxbC-Jmf4z5SKV3AaXdl5ocnqSqv6zwyGtdrAQC-aO4uoJudkyRpkSfZIa9Smycz3XJPCHiV3j7kWOyD2ei8xVK3W5BwGW6tIJQwdZ29zYFQ7mStazVqWy_GEvjSmnno2wJcJq', requestedQuantity: 1 },
    { id: 3, name: 'Tornillos 1 pulgada', stock: 12, unit: 'Unidades', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqnUprRD3Wg2I4e9Sb6zQVptyn1rJXVbkcLx1BW92ZXnXy_2ka_GZMjolYbhWOgfgBvp5pmLxntGIczBuyNd6Ay7laPzFJk8Bi9jfYHgBPtxy0V7DEZKRUqedL5IXYot1awEy_MwGwggdOZ5Zlyzb1iyIcF1air_RO5Q22Bs2jwqNoFO667xxvNmg7zk0Ml5ifcnHsN7Omb058xMRLk40qkL_clmEg2G8on1a4099tweOaMTF1nxVDZDpfvZ0v85Na4829UJAa_Xeg', requestedQuantity: 0 },
    { id: 4, name: 'Lija de agua #200', stock: 200, unit: 'Pliegos', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVyZg6MzGDy4-_yj0FhfdlqwV7KbWEIcuZ8qkHzzpQVuxfyurEce-No2dQt16pKCtGxAD7lW57FkPVwWKSd5AslSxl_HTd_m6s3QaaIuh9Gp4PCACMC5mw1U58rVcyQILYfBPPyZ_CO4b24xkgLM0xHVhWNa56KCc9cqv6TEYN2JjxYGXE1jAxSSOn27cgiPeFNiLl_ZGIJ7YKGcs6vrG5CUM6LfVwoM9EtBtfcqJtQN6P9bdj2SEkDDtMVwpgdii0Oo2MELNXgOj4', requestedQuantity: 5 },
  ]);

  filteredMaterials = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allMaterials();
    }
    return this.allMaterials().filter(material =>
      material.name.toLowerCase().includes(term)
    );
  });
  
  totalRequestedItems = computed(() => {
    return this.allMaterials().filter(m => m.requestedQuantity > 0).length;
  });

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
  
  updateQuantity(materialId: number, change: number) {
    this.allMaterials.update(materials =>
      materials.map(material => {
        if (material.id === materialId) {
          const newQuantity = material.requestedQuantity + change;
          if (newQuantity >= 0 && newQuantity <= material.stock) {
            return { ...material, requestedQuantity: newQuantity };
          }
        }
        return material;
      })
    );
  }

  getStockClass(stock: number): string {
    if (stock > 50) return 'text-green-500';
    if (stock > 20) return 'text-yellow-500';
    return 'text-orange-400';
  }

  submitRequest() {
    const request = this.allMaterials().filter(m => m.requestedQuantity > 0);
    console.log("Submitting request:", request);
    alert(`Solicitud de ${this.totalRequestedItems()} item(s) enviada.`);
  }
}
