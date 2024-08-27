import { IWallet, ITransaction } from '../src/utils/interface';

// test data
export const wallets: IWallet[] = [
  {
    id: '1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    created_at: new Date(2022, 3, 15),
    updated_at: new Date(2024, 6, 12),
  },
  {
    id: '3',
    created_at: new Date(2024, 6, 8),
    updated_at: new Date(2024, 6, 8),
  },
];

export const transactions: ITransaction[] = [
  { wallet: '1', currency: 'USDC', amount: 100, date: new Date() },
  { wallet: '1', currency: 'USDT', amount: 50, date: new Date() },
  { wallet: '1', currency: 'USDT', amount: 300, date: new Date() },
  { wallet: '1', currency: 'ETH', amount: 2, date: new Date(2023, 4, 15) },
  { wallet: '2', currency: 'USDC', amount: 150, date: new Date(2024, 1, 25) },
  { wallet: '2', currency: 'USDT', amount: 75, date: new Date() },
  { wallet: '2', currency: 'ETH', amount: 3, date: new Date(2024, 5, 5) },
  { wallet: '3', currency: 'USDC', amount: 200, date: new Date() },
  { wallet: '3', currency: 'ETH', amount: 1, date: new Date() },
  { wallet: '3', currency: 'USDT', amount: 100, date: new Date() },
  { wallet: '3', currency: 'ETH', amount: 4, date: new Date() },
];
