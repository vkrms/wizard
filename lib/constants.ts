import { type ComponentType, type SVGProps } from 'react';
import ArcadeIcon from '@/public/icon-arcade.svg';
import AdvancedIcon from '@/public/icon-advanced.svg';
import ProIcon from '@/public/icon-pro.svg';

export type PlanId = 'arcade' | 'advanced' | 'pro';

export interface Plan {
  id: PlanId;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  monthlyPrice: number;
  yearlyPerk: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
}

/** Yearly billing charges for 10 months (2 months free) */
export const YEARLY_BILLING_MONTHS = 10;

export const PLANS: Plan[] = [
  {
    id: 'arcade',
    name: 'Arcade',
    icon: ArcadeIcon,
    monthlyPrice: 9,
    yearlyPerk: '2 months free',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: AdvancedIcon,
    monthlyPrice: 12,
    yearlyPerk: '2 months free',
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: ProIcon,
    monthlyPrice: 15,
    yearlyPerk: '2 months free',
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'online-service',
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
  },
  {
    id: 'larger-storage',
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
  },
  {
    id: 'customizable-profile',
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
  },
];

// Helper functions for price calculation and formatting
export const getYearlyPrice = (monthlyPrice: number): number => {
  return monthlyPrice * YEARLY_BILLING_MONTHS;
};

export const formatPlanPrice = (plan: Plan, isYearly: boolean): string => {
  return isYearly
    ? `$${getYearlyPrice(plan.monthlyPrice)}/yr`
    : `$${plan.monthlyPrice}/mo`;
};

export const formatAddOnPrice = (addOn: AddOn, isYearly: boolean): string => {
  return isYearly
    ? `+$${getYearlyPrice(addOn.monthlyPrice)}/yr`
    : `+$${addOn.monthlyPrice}/mo`;
};

export const getPlanById = (id: PlanId): Plan => {
  const plan = PLANS.find(p => p.id === id);
  if (!plan) {
    throw new Error(`Invalid plan ID: ${id}`);
  }
  return plan;
};

export const getAddOnsByIds = (ids: string[]): AddOn[] => {
  return ADD_ONS.filter(ao => ids.includes(ao.id));
};
