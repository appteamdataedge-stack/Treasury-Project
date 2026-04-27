import { Routes } from '@angular/router';

export const routes: Routes = [
  // Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./modules/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  // Portfolio
  {
    path: 'portfolio/create',
    loadComponent: () =>
      import('./modules/portfolio/portfolio-setup/portfolio-setup.component')
        .then(m => m.PortfolioSetupComponent)
  },

  // MM Deal detail
  {
    path: 'mm-deal/:id',
    loadComponent: () =>
      import('./modules/mm-deal/deal-detail/deal-detail.component')
        .then(m => m.DealDetailComponent)
  },

  // MM Deal wizard
  {
    path: 'mm-deal/create/basics',
    loadComponent: () =>
      import('./modules/mm-deal/step1-basics/step1-basics.component')
        .then(m => m.Step1BasicsComponent)
  },
  {
    path: 'mm-deal/create/deposit',
    loadComponent: () =>
      import('./modules/mm-deal/step2-deposit/step2-deposit.component')
        .then(m => m.Step2DepositComponent)
  },
  {
    path: 'mm-deal/create/interest',
    loadComponent: () =>
      import('./modules/mm-deal/step3-interest/step3-interest.component')
        .then(m => m.Step3InterestComponent)
  },

  // Blotter
  {
    path: 'blotter',
    loadComponent: () =>
      import('./modules/blotter/blotter.component')
        .then(m => m.BlotterComponent)
  },

  // Instruments
  {
    path: 'instruments',
    loadComponent: () =>
      import('./modules/instruments/instrument-setup/instrument-setup.component')
        .then(m => m.InstrumentSetupComponent)
  },

  // Authorization Inbox
  {
    path: 'auth-inbox',
    loadComponent: () =>
      import('./modules/approvals/approvals.component')
        .then(m => m.ApprovalsComponent)
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
