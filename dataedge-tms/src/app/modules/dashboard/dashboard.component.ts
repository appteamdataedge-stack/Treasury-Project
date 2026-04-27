import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  readonly greeting  = this.getGreeting();
  readonly todayLabel = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());

  readonly kpis = [
    { icon: 'exposure', label: 'Total MM Exposure', value: 'BDT 53.2M', sub: '5 active deals',           badge: '+2 this week',   up: true,  color: 'navy'   },
    { icon: 'deals',    label: 'Active Deals',       value: '5',          sub: '2 ACCEPT · 3 PLACE',       badge: null,             up: null,  color: 'teal'   },
    { icon: 'calendar', label: 'Maturing ≤ 90d',     value: '2',          sub: 'Nearest: 19 Jul 2026',     badge: 'Action needed',  up: false, color: 'amber'  },
    { icon: 'rate',     label: 'Avg Rate (MM)',       value: '5.45%',      sub: 'Benchmark: 5.30%',         badge: '+15 bps',        up: true,  color: 'purple' },
  ];

  readonly activeDeals = [
    { id: 'MM-2026-00001', cp: 'City Bank Ltd',         dir: 'PLACE',  ccy: 'BDT', amount: '10,000,000', rate: '5.80', maturity: '22 Oct 2026', days: 183 },
    { id: 'MM-2026-00002', cp: 'BRAC Bank',              dir: 'PLACE',  ccy: 'USD', amount: '5,000,000',  rate: '5.20', maturity: '22 Jul 2026', days: 91  },
    { id: 'MM-2026-00003', cp: 'Sonali Bank',            dir: 'ACCEPT', ccy: 'BDT', amount: '15,000,000', rate: '6.50', maturity: '23 Jan 2027', days: 275 },
    { id: 'MM-2026-00004', cp: 'Janata Bank',            dir: 'ACCEPT', ccy: 'BDT', amount: '13,000,000', rate: '6.00', maturity: '23 Oct 2026', days: 184 },
    { id: 'MM-2026-00005', cp: 'Standard Chartered BD',  dir: 'ACCEPT', ccy: 'USD', amount: '2,000,000',  rate: '4.80', maturity: '19 Jul 2026', days: 88  },
  ];

  readonly maturingDeals = [
    { id: 'MM-2026-00001', cp: 'City Bank',  ccy: 'BDT', amount: '10M', maturity: '22 Oct', days: 183, color: 'indigo',  barPct: 100 },
    { id: 'MM-2026-00002', cp: 'BRAC Bank',  ccy: 'USD', amount: '5M',  maturity: '22 Jul', days: 91,  color: 'emerald', barPct: 50  },
    { id: 'MM-2026-00005', cp: 'Std Chtd',   ccy: 'USD', amount: '2M',  maturity: '19 Jul', days: 88,  color: 'indigo',  barPct: 48  },
  ];

  readonly currencyExposure = [
    { currency: 'BDT', amount: 'BDT 38M', pct: 71.7, color: 'navy'    },
    { currency: 'USD', amount: 'USD 7M',  pct: 13.2, color: 'emerald' },
    { currency: 'GBP', amount: 'GBP 1M',  pct: 1.9,  color: 'violet'  },
  ];

  readonly auditEvents = [
    { time: '10:34',     text: 'MM-2026-00001 authorized by S Ahmed',               dot: 'green'   },
    { time: '09:14',     text: 'PRTF-2026-001 submitted for approval by MD Rahman', dot: 'amber'   },
    { time: '08:55',     text: 'MM-2026-00002 released by KM Hossain',              dot: 'teal'    },
    { time: 'Yesterday', text: 'BP004 Standard Chartered — role updated',           dot: 'neutral' },
  ];

  dirBadge(dir: string): string { return dir === 'ACCEPT' ? 'teal' : 'navy'; }

  daysBadge(days: number): string {
    if (days <= 30) return 'red';
    if (days <= 90) return 'amber';
    return 'neutral';
  }

  private getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
