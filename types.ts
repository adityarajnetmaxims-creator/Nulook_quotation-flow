
import React from 'react';

export type ViewState = 'quotes' | 'add-quote' | 'clients' | 'overview' | 'jobs' | 'invoices' | 'team' | 'timesheet';
export type CustomerType = 'onboarded' | 'non-onboarded';

export interface Quote {
  id: string;
  name: string;
  clientName: string;
  clientAddress: string;
  clientPhone?: string;
  clientEmail?: string;
  scheduledDate: string;
  amount: number;
  status: 'scheduled' | 'sent';
  isClientOnboarded?: boolean;
}

export interface SidebarItem {
  id: ViewState;
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
