export interface ProductSpec {
  name: string;
  value: string;
}

export interface BulkPriceTier {
  range: string; // e.g., "1-4 units", "5-9 units", "10+ units"
  price: number; // in USD (standard B2B style) or KSh
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  moq: number; // Minimum Order Quantity
  basePrice: number; // in USD for display or equivalent
  tiers: BulkPriceTier[];
  verifiedSupplier: boolean;
  tradeAssurance: boolean;
  yearsActive: number;
  rating: number;
  status: 'Ready to Ship' | 'Customizable' | 'In Stock';
  specs: ProductSpec[];
  description: string;
  shippingEstimate: string;
}

export interface CyberService {
  id: string;
  name: string;
  category: 'government' | 'printing' | 'documents';
  price: number; // in KSh
  unit: string; // e.g., "per page", "per application", "per return"
  description: string;
  requirements: string[];
}

export interface DesignPackage {
  id: string;
  title: string;
  price: number; // in KSh
  timeline: string;
  deliverables: string[];
  description: string;
}

export interface CartItem {
  id: string; // matches product id or service id or design package id
  type: 'product' | 'service' | 'design';
  name: string;
  price: number; // selected tier price or base price
  quantity: number;
  image?: string;
  details?: string; // custom configurations/uploaded files
}

export interface DesignBrief {
  serviceType: string;
  title: string;
  description: string;
  style: 'Minimalist' | 'Bold' | 'Corporate' | 'Playful' | 'Vintage';
  colors: string[];
  logoText?: string;
  uploadedFiles: { name: string; size: number }[];
}

export interface CyberCafeRequest {
  serviceId: string;
  fullName: string;
  phone: string;
  email: string;
  extraDetails: string;
  uploadedFiles: { name: string; size: number }[];
}

export interface TrackerStatus {
  orderId: string;
  customerName: string;
  type: 'Wholesale Purchase' | 'Cyber Service' | 'Graphic Design';
  items: string;
  status: 'received' | 'review' | 'processing' | 'completed';
  date: string;
  timeline: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
  }[];
}
