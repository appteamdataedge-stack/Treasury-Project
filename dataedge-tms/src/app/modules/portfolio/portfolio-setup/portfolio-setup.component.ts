import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Counterparty {
  id: string;
  name: string;
  type: 'State-owned' | 'Private' | 'Foreign' | 'Islamic';
}

interface Currency {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-portfolio-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, NgSelectModule],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', overflow: 'hidden', opacity: 0 }),
        animate('220ms ease-out', style({ height: '*', overflow: 'hidden', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ overflow: 'hidden' }),
        animate('160ms ease-in', style({ height: '0', opacity: 0, overflow: 'hidden' }))
      ])
    ]),
    trigger('expandPanel', [
      state('open',   style({ height: '*', overflow: 'hidden', opacity: 1 })),
      state('closed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
      transition('open <=> closed', animate('220ms ease'))
    ])
  ],
  templateUrl: './portfolio-setup.component.html',
  styleUrl: './portfolio-setup.component.scss'
})
export class PortfolioSetupComponent implements OnInit {

  portfolioForm!: FormGroup;

  // UI
  infoPanelOpen = true;
  showToast    = false;
  toastMessage = '';
  toastType: 'success' | 'info' = 'success';
  toastLink: string | null = null;

  // Shuttle
  availableCounterparties: Counterparty[] = [];
  assignedCounterparties: Counterparty[] = [];
  selectedAvailableIds: string[] = [];
  selectedAssignedIds: string[] = [];
  availableSearch = '';
  assignedSearch = '';

  // ─── Static data ─────────────────────────────────────────────────────

  bookTypes = [
    { value: 'BANKING', label: 'Banking Book' },
    { value: 'TRADING', label: 'Trading Book' },
    { value: 'ALM',     label: 'ALM Book'     },
  ];

  statusOptions = [
    { value: 'DRAFT',    label: 'Draft'    },
    { value: 'ACTIVE',   label: 'Active'   },
    { value: 'INACTIVE', label: 'Inactive' },
  ];

  reportingTagOptions = [
    { id: 'BASEL', label: 'Basel', color: 'navy'   },
    { id: 'ALM',   label: 'ALM',   color: 'teal'   },
    { id: 'LCR',   label: 'LCR',   color: 'purple' },
    { id: 'NSFR',  label: 'NSFR',  color: 'amber'  },
  ];

  dealers = [
    { id: 'USR001', name: 'Ahmed Rahman',   role: 'Senior Dealer'  },
    { id: 'USR002', name: 'Farida Islam',   role: 'Dealer'         },
    { id: 'USR003', name: 'Karim Hossain', role: 'Junior Dealer'  },
    { id: 'USR004', name: 'Nasrin Akter',  role: 'Dealer'         },
  ];

  products = [
    { id: 'FTD',   label: 'Fixed Term Deposit' },
    { id: 'CALL',  label: 'Call Deposit'       },
    { id: 'OND',   label: 'Overnight Deposit'  },
    { id: 'REPO',  label: 'Repo Agreement'     },
    { id: 'TBILL', label: 'Treasury Bill'      },
  ];

  allCounterparties: Counterparty[] = [
    { id: 'BP001', name: 'Sonali Bank',              type: 'State-owned' },
    { id: 'BP002', name: 'Janata Bank',               type: 'State-owned' },
    { id: 'BP003', name: 'BRAC Bank',                 type: 'Private'     },
    { id: 'BP004', name: 'City Bank Ltd',             type: 'Private'     },
    { id: 'BP005', name: 'Dutch-Bangla Bank',         type: 'Private'     },
    { id: 'BP006', name: 'Standard Chartered BD',    type: 'Foreign'     },
    { id: 'BP007', name: 'Islami Bank Bangladesh',   type: 'Islamic'     },
    { id: 'BP008', name: 'HSBC Bangladesh',           type: 'Foreign'     },
    { id: 'BP009', name: 'Al-Arafah Islami Bank',    type: 'Islamic'     },
  ];

  currencies: Currency[] = [
    { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩' },
    { code: 'USD', name: 'US Dollar',         flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro',              flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound',     flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen',      flag: '🇯🇵' },
    { code: 'SGD', name: 'Singapore Dollar',  flag: '🇸🇬' },
    { code: 'AED', name: 'UAE Dirham',        flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal',       flag: '🇸🇦' },
    { code: 'CNY', name: 'Chinese Yuan',      flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee',      flag: '🇮🇳' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.portfolioForm = new FormGroup({
      portfolioId:        new FormControl({ value: 'PRTF-2026-001', disabled: true }),
      portfolioName:      new FormControl('', [Validators.required, Validators.maxLength(60)]),
      bookType:           new FormControl('BANKING', Validators.required),
      status:             new FormControl(true),
      effectiveDate:      new FormControl(this.toIsoDate(new Date()), Validators.required),
      reportingTags:      new FormControl<string[]>([]),
      limitGroupId:       new FormControl(''),
      dealerRestrict:     new FormControl('ALL'),
      selectedDealers:    new FormControl<string[]>([]),
      productRestrict:    new FormControl('ALL'),
      selectedProducts:   new FormControl<string[]>([]),
      currencyScope:      new FormControl('ALL'),
      selectedCurrencies: new FormControl<string[]>([]),
    });

    const initialAssigned = ['BP006', 'BP007'];
    this.assignedCounterparties  = this.allCounterparties.filter(c =>  initialAssigned.includes(c.id));
    this.availableCounterparties = this.allCounterparties.filter(c => !initialAssigned.includes(c.id));
  }

  // ─── Helpers ─────────────────────────────────────────────────────────

  private toIsoDate(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  isAssigned(id: string): boolean {
    return this.assignedCounterparties.some(c => c.id === id);
  }

  cpTypeBadge(type: string): string {
    const map: Record<string, string> = {
      'State-owned': 'navy', 'Private': 'teal', 'Foreign': 'purple', 'Islamic': 'amber'
    };
    return map[type] ?? 'neutral';
  }

  getCurrency(code: string): Currency | undefined {
    return this.currencies.find(c => c.code === code);
  }

  getTagOption(id: string) {
    return this.reportingTagOptions.find(t => t.id === id);
  }

  // ─── Getters ─────────────────────────────────────────────────────────

  get dealerRestrict(): string  { return this.portfolioForm.get('dealerRestrict')?.value; }
  get productRestrict(): string { return this.portfolioForm.get('productRestrict')?.value; }
  get currencyScope(): string   { return this.portfolioForm.get('currencyScope')?.value; }
  get reportingTags(): string[] { return this.portfolioForm.get('reportingTags')?.value ?? []; }
  get selectedCurrencies(): string[] { return this.portfolioForm.get('selectedCurrencies')?.value ?? []; }

  get filteredAvailable(): Counterparty[] {
    const q = this.availableSearch.toLowerCase();
    return this.availableCounterparties.filter(c =>
      c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }

  get filteredAssigned(): Counterparty[] {
    const q = this.assignedSearch.toLowerCase();
    return this.assignedCounterparties.filter(c =>
      c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    );
  }

  get availableTagsForAdd() {
    return this.reportingTagOptions.filter(t => !this.reportingTags.includes(t.id));
  }

  // ─── Reporting Tags ───────────────────────────────────────────────────

  addTag(tagId: string | null) {
    if (!tagId) return;
    const current = [...this.reportingTags];
    if (!current.includes(tagId)) {
      this.portfolioForm.patchValue({ reportingTags: [...current, tagId] });
    }
  }

  removeTag(tagId: string) {
    this.portfolioForm.patchValue({ reportingTags: this.reportingTags.filter(t => t !== tagId) });
  }

  // ─── Shuttle List ─────────────────────────────────────────────────────

  toggleAvailable(id: string, event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.selectedAvailableIds = this.selectedAvailableIds.includes(id)
        ? this.selectedAvailableIds.filter(x => x !== id)
        : [...this.selectedAvailableIds, id];
    } else {
      this.selectedAvailableIds = this.selectedAvailableIds.includes(id) && this.selectedAvailableIds.length === 1
        ? []
        : [id];
    }
  }

  toggleAssigned(id: string, event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.selectedAssignedIds = this.selectedAssignedIds.includes(id)
        ? this.selectedAssignedIds.filter(x => x !== id)
        : [...this.selectedAssignedIds, id];
    } else {
      this.selectedAssignedIds = this.selectedAssignedIds.includes(id) && this.selectedAssignedIds.length === 1
        ? []
        : [id];
    }
  }

  moveSelectedRight() {
    const toMove = this.availableCounterparties.filter(c => this.selectedAvailableIds.includes(c.id));
    if (!toMove.length) return;
    this.assignedCounterparties  = [...this.assignedCounterparties, ...toMove];
    this.availableCounterparties = this.availableCounterparties.filter(c => !this.selectedAvailableIds.includes(c.id));
    this.selectedAvailableIds = [];
  }

  moveAllRight() {
    this.assignedCounterparties  = [...this.assignedCounterparties, ...this.availableCounterparties];
    this.availableCounterparties = [];
    this.selectedAvailableIds = [];
  }

  moveSelectedLeft() {
    const toMove = this.assignedCounterparties.filter(c => this.selectedAssignedIds.includes(c.id));
    if (!toMove.length) return;
    this.availableCounterparties = [...this.availableCounterparties, ...toMove];
    this.assignedCounterparties  = this.assignedCounterparties.filter(c => !this.selectedAssignedIds.includes(c.id));
    this.selectedAssignedIds = [];
  }

  moveAllLeft() {
    this.availableCounterparties = [...this.availableCounterparties, ...this.assignedCounterparties];
    this.assignedCounterparties  = [];
    this.selectedAssignedIds = [];
  }

  // ─── Restriction setters ──────────────────────────────────────────────

  setDealerRestrict(val: string) {
    this.portfolioForm.patchValue({ dealerRestrict: val });
    if (val === 'ALL') this.portfolioForm.patchValue({ selectedDealers: [] });
  }

  setProductRestrict(val: string) {
    this.portfolioForm.patchValue({ productRestrict: val });
    if (val === 'ALL') this.portfolioForm.patchValue({ selectedProducts: [] });
  }

  setCurrencyScope(val: string) {
    this.portfolioForm.patchValue({ currencyScope: val });
    if (val === 'ALL') this.portfolioForm.patchValue({ selectedCurrencies: [] });
  }

  // ─── Form Actions ─────────────────────────────────────────────────────

  onSubmit() {
    const dealCtrl      = this.portfolioForm.get('selectedDealers')!;
    const prodCtrl      = this.portfolioForm.get('selectedProducts')!;
    const currCtrl      = this.portfolioForm.get('selectedCurrencies')!;

    dealCtrl.setValidators(this.dealerRestrict  === 'SELECTED' ? Validators.required : null);
    prodCtrl.setValidators(this.productRestrict === 'SELECTED' ? Validators.required : null);
    currCtrl.setValidators(this.currencyScope   === 'SELECTED' ? Validators.required : null);
    [dealCtrl, prodCtrl, currCtrl].forEach(c => c.updateValueAndValidity());

    this.portfolioForm.markAllAsTouched();
    if (this.portfolioForm.invalid) {
      const el = document.querySelector('.ng-invalid.ng-touched:not(form)') as HTMLElement | null;
      el?.closest('.de-field')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    this.toastLink = '/auth-inbox';
    this.toast('Portfolio PRTF-2026-001 submitted for approval', 'success');
  }

  saveDraft() {
    this.toast('Draft saved successfully.', 'info');
  }

  toast(msg: string, type: 'success' | 'info') {
    this.toastMessage = msg;
    this.toastType    = type;
    this.showToast    = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastLink = null;
      this.cdr.detectChanges();
    }, 4000);
  }
}
