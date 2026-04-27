import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApprovalsService } from '../../services/approvals.service';

@Component({
  selector: 'de-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNavComponent {
  private approvalsService = inject(ApprovalsService);
  get pendingCount(): number { return this.approvalsService.count; }
}
