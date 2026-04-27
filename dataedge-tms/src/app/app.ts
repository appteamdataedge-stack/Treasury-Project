import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { NavbarComponent } from './core/layout/navbar/navbar';
import { SidebarComponent } from './core/layout/sidebar/sidebar';
import { FooterComponent } from './core/layout/footer/footer';
import { BottomNavComponent } from './core/layout/bottom-nav/bottom-nav';
import { LayoutService } from './core/services/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, SidebarComponent, FooterComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    style: 'display:flex; flex-direction:column; height:100vh; overflow:hidden;'
  }
})
export class App {
  private layout = inject(LayoutService);
  activeRoute = '';

  get sidebarOpen(): boolean { return this.layout.sidebarOpen; }
  closeNav(): void           { this.layout.close(); }

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ).subscribe(url => {
      this.activeRoute = url;
      this.layout.close();
    });
  }
}
