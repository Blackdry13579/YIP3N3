import { AppUser, FishPrice, Order } from './supabase';

export const mockUser: AppUser = {
  id: '1',
  email: 'patron@yip3n3.com',
  role: 'patron',
  full_name: 'Patrick',
};

export const mockServeur: AppUser = {
  id: '2',
  email: 'serveur@yip3n3.com',
  role: 'serveur',
  full_name: 'Dockyname',
};

export const mockPrices: FishPrice[] = [
  { id: '1', amount: 2000, label: '', active: true, created_at: '2026-06-01' },
  { id: '2', amount: 3000, label: '', active: true, created_at: '2026-06-01' },
  { id: '3', amount: 5000, label: '', active: true, created_at: '2026-06-01' },
  { id: '4', amount: 6000, label: '', active: false, created_at: '2026-06-01' },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    reference: 'Y7K2M9',
    server_id: '2',
    server_name: 'Dockyname',
    client_phone: '70 12 34 56',
    status: 'en_cours',
    total_amount: 3000,
    created_at: '2026-06-07T10:00:00',
    items: [{ id: '1', order_id: '1', fish_price_id: '2', quantity: 1, unit_price: 3000, line_total: 3000 }],
  },
  {
    id: '2',
    reference: 'A4B8C2',
    server_id: '2',
    server_name: 'Dockyname',
    status: 'en_cours',
    total_amount: 6000,
    created_at: '2026-06-07T10:15:00',
    items: [{ id: '2', order_id: '2', fish_price_id: '3', quantity: 1, unit_price: 5000, line_total: 5000 }, { id: '3', order_id: '2', fish_price_id: '1', quantity: 1, unit_price: 2000, line_total: 2000 }],
  },
  {
    id: '3',
    reference: 'M3Z9P1',
    server_id: '2',
    server_name: 'Dockyname',
    status: 'terminee',
    total_amount: 4000,
    created_at: '2026-06-07T09:00:00',
    completed_at: '2026-06-07T09:45:00',
    items: [{ id: '4', order_id: '3', fish_price_id: '2', quantity: 1, unit_price: 3000, line_total: 3000 }, { id: '5', order_id: '3', fish_price_id: '1', quantity: 1, unit_price: 2000, line_total: 2000 }],
  },
  {
    id: '4',
    reference: 'X2K7N4',
    server_id: '2',
    server_name: 'Dockyname',
    client_phone: '77 56 78 90',
    status: 'terminee',
    total_amount: 5000,
    created_at: '2026-06-07T08:30:00',
    completed_at: '2026-06-07T09:10:00',
    items: [{ id: '6', order_id: '4', fish_price_id: '3', quantity: 1, unit_price: 5000, line_total: 5000 }],
  },
];
