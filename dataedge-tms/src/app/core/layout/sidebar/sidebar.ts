import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApprovalsService } from '../../services/approvals.service';
import { LayoutService } from '../../services/layout.service';

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'de-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {
  @Input() activeItem = '';
  @Input() isOpen     = false;

  private approvalsService = inject(ApprovalsService);

  get pendingCount(): number { return this.approvalsService.count; }

  navGroups: NavGroup[] = [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', route: '/dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
      ]
    },
    {
      label: 'Money Market',
      items: [
        { label: 'Blotter', route: '/blotter', icon: 'M3 12h18M3 6h18M3 18h12' },
        { label: 'MM Deals', route: '/mm-deal/create/basics', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2' },
      ]
    },
    {
      label: 'Setup',
      items: [
        { label: 'Portfolios', route: '/portfolio/create', icon: 'M3 7h18M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M3 7l2 13h14l2-13M10 11v4M14 11v4' },
        { label: 'Counterparties', route: '/counterparties', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
        { label: 'Instruments', route: '/instruments', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
      ]
    },
    {
      label: 'Workflow',
      items: [
        { label: 'Auth Inbox', route: '/auth-inbox', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4' },
      ]
    },
    {
      label: 'Reports',
      items: [
        { label: 'Deal Summary', route: '/reports/deals', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8' },
        { label: 'Audit Trail', route: '/reports/audit', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      ]
    }
  ];
}
