import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Tab = 'summary' | 'cashflow' | 'accounting' | 'audit';

@Component({
  selector: 'app-deal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deal-detail.component.html',
  styleUrl: './deal-detail.component.scss'
})
export class DealDetailComponent {

  activeTab: Tab = 'summary';
  setTab(t: Tab): void { this.activeTab = t; }

  readonly deal = {
    id:              'MM-2026-00001',
    counterparty:    'City Bank Ltd',
    direction:       'PLACE' as const,
    instrument:      'Fixed Term Deposit',
    instrumentCode:  'FTD',
    dealType:        'TERM' as 'TERM' | 'CALL',
    currency:        'BDT',
    faceValue:       10_000_000,
    rate:            7.25,
    valueDate:       '22 Apr 2026',
    maturityDate:    '22 Oct 2026',
    tenor:           183,
    dayCount:        'ACT / 365',
    portfolio:       'MM-PORTFOLIO-001',
    settlementGl:    '1001-Settlement',
    liabilityGl:     '2001-MM-Liability',
    status:          'AUTHORIZED' as 'AUTHORIZED' | 'SUBMITTED' | 'REJECTED' | 'CANCELLED' | 'MATURED',
    maker:           'MD Rahman',
    authorisedBy:    'KM Hossain',
    interest:        26_301.37,
    maturityAmount:  10_026_301.37,
    dealDate:        '20 Apr 2026',
    authorisedDate:  '21 Apr 2026',
  };

  readonly cashflows = [
    { seq: 1, date: '22 Oct 2026', type: 'RECEIVE', event: 'Principal + Interest', amount: 10_026_301.37, status: 'PENDING' },
  ];

  readonly bookingEntries: { date: string; description: string; gl: string; dr: number | null; cr: number | null }[] = [
    { date: '22 Apr 2026', description: 'Dr Settlement Account', gl: '1001-Settlement', dr: 10_000_000, cr: null  },
    { date: '22 Apr 2026', description: 'Cr MM Liability GL',    gl: '2001-MM-Liability', dr: null,  cr: 10_000_000 },
  ];

  readonly auditEvents = [
    { date: '20 Apr 2026', time: '09:14', user: 'MD Rahman',  role: 'Dealer',             event: 'Deal created and submitted for authorization' },
    { date: '21 Apr 2026', time: '10:32', user: 'KM Hossain', role: 'Treasury Manager',   event: 'Deal authorized' },
  ];

  fmtAmount(n: number): string {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
