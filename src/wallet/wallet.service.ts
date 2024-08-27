import { Injectable } from '@nestjs/common';
import { wallets, transactions } from 'test/data';
import { IWallet } from 'src/utils/interface';

// sum the amount according to the currency
function groupByCurrency(transactions) {
  const result: Record<string, number> = {};

  transactions.forEach((transaction) => {
    if (result[transaction.currency])
      result[transaction.currency] += transaction.amount;
    else result[transaction.currency] = transaction.amount;
  });

  return result;
}

@Injectable()
export class WalletService {
  getAllWallets() {
    return wallets;
  }

  getWalletById(id: string) {
    return wallets.find((wallet) => wallet.id === id);
  }

  getWalletWithBalance(
    id: string,
  ): IWallet & { balance: Record<string, number> } {
    const wallet = this.getWalletById(id);

    if (!wallet) return null;

    const filteredTransactions = transactions.filter(
      (transaction) => transaction.wallet === id,
    );

    return { ...wallet, balance: groupByCurrency(filteredTransactions) };
  }

  getTransferVolume(id: string): Record<string, number> {
    // TODO: replace with data from database
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.wallet === id && transaction.date >= twentyFourHoursAgo,
    );

    return groupByCurrency(filteredTransactions);
  }
}
