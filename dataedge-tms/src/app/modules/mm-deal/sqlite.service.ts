import { Injectable } from '@angular/core';
import { MmDealPayload } from './mm-deal-api.service';

interface StoredDeal extends MmDealPayload {
  status: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private store: StoredDeal[] = [];

  insertDeal(payload: MmDealPayload): { dealId: string } {
    this.store.push({ ...payload, status: 'SAVED', createdAt: new Date().toISOString() });
    return { dealId: payload.dealId };
  }

  getPendingDeals(): StoredDeal[] {
    return this.store.filter(d => d.status === 'SAVED');
  }
}
