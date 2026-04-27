import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { animate, style, transition, trigger } from '@angular/animations';

export interface Deal {
  id: string;
  dealDate: string;
  counterparty: string;
  direction: 'ACCEPT' | 'PLACE';
  instrument: string;
  currency: string;
  amount: number;
  rate: number;
  valueDate: string;
  maturityDate: string;
  days: number;
  status: 'ACTIVE' | 'PENDING' | 'MATURED' | 'CANCELLED';
}

@Component({
  selector: 'app-blotter',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgSelectModule],
  animations: [
    trigger('slideOver', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('250ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('backdropFade', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms ease', style({ opacity: 1 }))]),
      transition(':leave', [animate('150ms ease', style({ opacity: 0 }))])
    ])
  ],
  templateUrl: './blotter.component.html',
  styleUrl:    './blotter.component.scss'
})
export class BlotterComponent {

  filterOpen   = false;
  selectedDeal: Deal | null = null;

  selectDeal(d: Deal): void { this.filterOpen = false; this.selectedDeal = d; }
  closeDeal(): void          { this.selectedDeal = null; }

  filters = {
    direction:      'ALL' as 'ALL' | 'ACCEPT' | 'PLACE',
    counterparties: [] as string[],
    currencies:     [] as string[],
    statuses:       [] as string[],
  };

  sortCol: keyof Deal = 'dealDate';
  sortDir: 'asc' | 'desc' = 'desc';

  readonly allDeals: Deal[] = [
    { id: 'MM-2026-00001', dealDate: '2026-04-20', counterparty: 'City Bank Ltd',         direction: 'PLACE',  instrument: 'Fixed Term Deposit', currency: 'BDT', amount: 10_000_000, rate: 5.80, valueDate: '2026-04-20', maturityDate: '2026-10-22', days: 183, status: 'ACTIVE'   },
    { id: 'MM-2026-00002', dealDate: '2026-04-23', counterparty: 'BRAC Bank',              direction: 'PLACE',  instrument: 'Fixed Term Deposit', currency: 'USD', amount:  5_000_000, rate: 5.20, valueDate: '2026-04-23', maturityDate: '2026-07-22', days: 91,  status: 'ACTIVE'   },
    { id: 'MM-2026-00003', dealDate: '2026-04-22', counterparty: 'Sonali Bank',            direction: 'ACCEPT', instrument: 'Fixed Term Deposit', currency: 'BDT', amount: 15_000_000, rate: 6.50, valueDate: '2026-04-25', maturityDate: '2027-01-23', days: 275, status: 'ACTIVE'   },
    { id: 'MM-2026-00004', dealDate: '2026-04-01', counterparty: 'Janata Bank',            direction: 'ACCEPT', instrument: 'Call Deposit',       currency: 'BDT', amount: 13_000_000, rate: 6.00, valueDate: '2026-04-01', maturityDate: '2026-10-23', days: 184, status: 'ACTIVE'   },
    { id: 'MM-2026-00005', dealDate: '2026-04-21', counterparty: 'Standard Chartered BD',  direction: 'ACCEPT', instrument: 'Overnight Deposit',  currency: 'USD', amount:  2_000_000, rate: 4.80, valueDate: '2026-04-21', maturityDate: '2026-07-19', days: 88,  status: 'ACTIVE'   },
    { id: 'MM-2026-00006', dealDate: '2026-04-10', counterparty: 'Dutch-Bangla Bank',      direction: 'PLACE',  instrument: 'Repo Agreement',     currency: 'BDT', amount:  8_000_000, rate: 5.50, valueDate: '2026-04-10', maturityDate: '2026-07-10', days: 78,  status: 'PENDING'  },
    { id: 'MM-2026-00007', dealDate: '2026-03-01', counterparty: 'Islami Bank Bangladesh', direction: 'ACCEPT', instrument: 'Fixed Term Deposit', currency: 'BDT', amount: 20_000_000, rate: 6.75, valueDate: '2026-03-01', maturityDate: '2026-03-31', days: 0,   status: 'MATURED'  },
    { id: 'MM-2026-00008', dealDate: '2026-01-15', counterparty: 'HSBC Bangladesh',        direction: 'PLACE',  instrument: 'Treasury Bill',      currency: 'USD', amount:  3_000_000, rate: 4.50, valueDate: '2026-01-15', maturityDate: '2026-04-15', days: 0,   status: 'MATURED'  },
    { id: 'MM-2026-00009', dealDate: '2026-04-22', counterparty: 'BRAC Bank',              direction: 'PLACE',  instrument: 'Fixed Term Deposit', currency: 'BDT', amount: 12_000_000, rate: 6.20, valueDate: '2026-04-22', maturityDate: '2026-10-22', days: 183, status: 'PENDING'  },
    { id: 'MM-2026-00010', dealDate: '2026-04-23', counterparty: 'City Bank Ltd',          direction: 'ACCEPT', instrument: 'Overnight Deposit',  currency: 'USD', amount:  1_500_000, rate: 5.00, valueDate: '2026-04-23', maturityDate: '2026-04-24', days: 1,   status: 'ACTIVE'   },
    { id: 'MM-2026-00011', dealDate: '2026-02-10', counterparty: 'Al-Arafah Islami Bank',  direction: 'PLACE',  instrument: 'Fixed Term Deposit', currency: 'BDT', amount:  7_500_000, rate: 6.10, valueDate: '2026-02-10', maturityDate: '2026-08-10', days: 109, status: 'ACTIVE'   },
    { id: 'MM-2026-00012', dealDate: '2026-03-15', counterparty: 'Sonali Bank',            direction: 'PLACE',  instrument: 'Repo Agreement',     currency: 'BDT', amount:  9_000_000, rate: 5.75, valueDate: '2026-03-15', maturityDate: '2026-03-22', days: 0,   status: 'CANCELLED'},
  ];

  readonly statusOptions = ['ACTIVE', 'PENDING', 'MATURED', 'CANCELLED'];

  get uniqueCounterparties(): string[] {
    return [...new Set(this.allDeals.map(d => d.counterparty))].sort();
  }

  get uniqueCurrencies(): string[] {
    return [...new Set(this.allDeals.map(d => d.currency))].sort();
  }

  get filteredDeals(): Deal[] {
    let list = [...this.allDeals];

    if (this.filters.direction !== 'ALL')         list = list.filter(d => d.direction === this.filters.direction);
    if (this.filters.counterparties.length)        list = list.filter(d => this.filters.counterparties.includes(d.counterparty));
    if (this.filters.currencies.length)            list = list.filter(d => this.filters.currencies.includes(d.currency));
    if (this.filters.statuses.length)              list = list.filter(d => this.filters.statuses.includes(d.status));

    list.sort((a, b) => {
      const av = String(a[this.sortCol]);
      const bv = String(b[this.sortCol]);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }

  get activeFilterCount(): number {
    let n = this.filters.direction !== 'ALL' ? 1 : 0;
    return n + this.filters.counterparties.length + this.filters.currencies.length + this.filters.statuses.length;
  }

  get activeChips(): { label: string; key: string; value: string }[] {
    const chips: { label: string; key: string; value: string }[] = [];
    if (this.filters.direction !== 'ALL')
      chips.push({ label: this.filters.direction, key: 'direction', value: this.filters.direction });
    this.filters.counterparties.forEach(c => chips.push({ label: c, key: 'counterparty', value: c }));
    this.filters.currencies.forEach(c    => chips.push({ label: c, key: 'currency',     value: c }));
    this.filters.statuses.forEach(s      => chips.push({ label: s, key: 'status',        value: s }));
    return chips;
  }

  clearFilters(): void {
    this.filters = { direction: 'ALL', counterparties: [], currencies: [], statuses: [] };
  }

  removeChip(chip: { key: string; value: string }): void {
    switch (chip.key) {
      case 'direction':    this.filters.direction      = 'ALL'; break;
      case 'counterparty': this.filters.counterparties = this.filters.counterparties.filter(x => x !== chip.value); break;
      case 'currency':     this.filters.currencies     = this.filters.currencies.filter(x => x !== chip.value); break;
      case 'status':       this.filters.statuses       = this.filters.statuses.filter(x => x !== chip.value); break;
    }
  }

  toggleSort(col: keyof Deal): void {
    this.sortDir = this.sortCol === col && this.sortDir === 'desc' ? 'asc' : 'desc';
    this.sortCol = col;
  }

  fmtAmount(n: number): string {
    return new Intl.NumberFormat('en-US').format(n);
  }

  fmtDate(iso: string): string {
    return iso ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso)) : '—';
  }

  statusBadge(s: string): string {
    return ({ ACTIVE: 'teal', PENDING: 'amber', MATURED: 'neutral', CANCELLED: 'red' } as Record<string,string>)[s] ?? 'neutral';
  }

  daysBadge(d: number): string {
    if (d <= 7)  return 'red';
    if (d <= 90) return 'amber';
    return 'neutral';
  }
}
