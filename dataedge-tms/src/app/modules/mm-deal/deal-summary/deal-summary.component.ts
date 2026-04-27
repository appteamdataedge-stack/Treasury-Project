import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deal-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deal-summary.component.html',
  styleUrl: './deal-summary.component.scss'
})
export class DealSummaryComponent {

  private route = inject(ActivatedRoute);
  readonly dealId = this.route.snapshot.paramMap.get('id') ?? 'MM-2026-00001';

  // Demo: hardcoded MM-2026-00001 data (matches deal-detail)
  readonly deal = {
    id:             'MM-2026-00001',
    counterparty:   'City Bank Ltd',
    counterpartyId: 'BP002',
    direction:      'PLACE' as const,
    instrument:     'Fixed Term Deposit',
    instrumentCode: 'FTD',
    dealType:       'TERM',
    currency:       'BDT',
    faceValue:      10_000_000,
    rate:           7.25,
    rateType:       'Fixed',
    dayCount:       'ACT / 365',
    tenor:          183,
    valueDate:      '22 Apr 2026',
    maturityDate:   '22 Oct 2026',
    dealDate:       '20 Apr 2026',
    authorisedDate: '21 Apr 2026',
    portfolio:      'MM-PORTFOLIO-001',
    settlementGl:   '1001-Settlement',
    liabilityGl:    '2001-MM-Liability',
    status:         'AUTHORIZED' as 'AUTHORIZED' | 'SUBMITTED' | 'REJECTED' | 'CANCELLED' | 'MATURED',
    maker:          'MD Rahman',
    authorisedBy:   'KM Hossain',
    interest:       26_301.37,
    maturityAmount: 10_026_301.37,
  };

  readonly cashflows = [
    { seq: 1, date: '22 Oct 2026', type: 'RECEIVE', event: 'Principal + Interest', amount: 10_026_301.37, status: 'PENDING' },
  ];

  readonly bookingEntries: { date: string; description: string; gl: string; dr: number | null; cr: number | null }[] = [
    { date: '22 Apr 2026', description: 'Dr Settlement Account', gl: '1001-Settlement',  dr: 10_000_000, cr: null },
    { date: '22 Apr 2026', description: 'Cr MM Liability GL',    gl: '2001-MM-Liability', dr: null, cr: 10_000_000 },
  ];

  readonly statusBadgeMap: Record<string, string> = {
    AUTHORIZED: 'green', SUBMITTED: 'amber', REJECTED: 'red',
    CANCELLED: 'neutral', MATURED: 'neutral',
  };

  get statusBadge(): string { return this.statusBadgeMap[this.deal.status] ?? 'neutral'; }

  fmtAmount(n: number): string {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  printPage(): void { window.print(); }
}
