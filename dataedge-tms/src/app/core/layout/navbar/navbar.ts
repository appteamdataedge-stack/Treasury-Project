import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'de-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  private layout = inject(LayoutService);

  currentUser = {
    name: 'Admin User',
    initials: 'AU',
    role: 'Treasury Manager',
  };

  notificationCount = 3;
  showUserMenu = false;

  toggleUserMenu(): void { this.showUserMenu = !this.showUserMenu; }
  toggleSidebar(): void  { this.layout.toggle(); }
}
