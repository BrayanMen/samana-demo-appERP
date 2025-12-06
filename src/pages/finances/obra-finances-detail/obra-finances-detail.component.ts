import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Transaction {
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

interface ObraFinanceDetails {
  id: string;
  name: string;
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
}

@Component({
  selector: 'app-obra-finances-detail',
  templateUrl: './obra-finances-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
})
export class ObraFinancesDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  obraDetails = signal<ObraFinanceDetails | undefined>(undefined);

  private allObrasData: ObraFinanceDetails[] = [
    {
      id: 'Remodelación Casa Cumbres',
      name: 'Remodelación Casa Cumbres',
      transactions: [
        { description: 'Adelanto del cliente', amount: 5000, date: '2024-07-10', type: 'income' },
        { description: 'Compra de cemento y arena', amount: -850, date: '2024-07-11', type: 'expense' },
        { description: 'Pago a electricista', amount: -1200, date: '2024-07-15', type: 'expense' },
        { description: 'Pago final del cliente', amount: 7150, date: '2024-07-20', type: 'income' },
        { description: 'Alquiler de andamios', amount: -300, date: '2024-07-12', type: 'expense' },
        { description: 'Sueldo de personal', amount: -2650, date: '2024-07-18', type: 'expense' },
      ],
      totalIncome: 0, // Will be calculated
      totalExpenses: 0, // Will be calculated
      netProfit: 0 // Will be calculated
    },
    {
      id: 'Oficinas Corporativas Hub',
      name: 'Oficinas Corporativas Hub',
      transactions: [
        { description: 'Primer pago del cliente', amount: 10000, date: '2024-06-05', type: 'income' },
        { description: 'Compra de paneles de yeso', amount: -2500, date: '2024-06-08', type: 'expense' },
        { description: 'Servicios de plomería', amount: -1800, date: '2024-06-12', type: 'expense' },
        { description: 'Segundo pago del cliente', amount: 8500, date: '2024-06-25', type: 'income' },
      ],
      totalIncome: 0,
      totalExpenses: 0,
      netProfit: 0
    }
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const obraId = params.get('id');
      if (obraId) {
        const data = this.allObrasData.find(obra => obra.id === obraId);
        if (data) {
           const totalIncome = data.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
           const totalExpenses = data.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
           data.totalIncome = totalIncome;
           data.totalExpenses = totalExpenses * -1; // display as positive
           data.netProfit = totalIncome + totalExpenses; // expenses are negative
           this.obraDetails.set(data);
        }
      }
    });
  }
}
