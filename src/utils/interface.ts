export interface IWallet {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITransaction {
  wallet: string;
  currency: string;
  amount: number;
  date: Date;
}
