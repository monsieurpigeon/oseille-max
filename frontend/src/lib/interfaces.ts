export interface Product {
  id: number;
  name: string;
}

export interface Customer {
  id: number;
  name: string;
}

export interface Price {
  productId: number;
  customerId: number;
  value: number;
}

export interface Order {
  customerId: number;
  notes: string;
  deliveredAt: string;
}

export interface Delivery {
  id: number;
  name: string;
  customerId: number;
  notes: string;
  deliveredAt: string;
}
