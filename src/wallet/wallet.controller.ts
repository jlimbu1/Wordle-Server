import { Controller, Get, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { IWallet } from 'src/utils/interface';

// TODO: handle permissions (either admin or wallet owner only)
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // endpoint: {base_url}/wallets
  // returns all wallets
  @Get()
  getAllWallets(): IWallet[] {
    return this.walletService.getAllWallets();
  }

  // endpoint: {base_url}/wallets/:id
  // returns a wallet
  @Get(':id')
  getWalletById(@Param('id') id: string): IWallet {
    return this.walletService.getWalletById(id);
  }

  // endpoint: {base_url}/wallets/:id/balance
  // returns a wallet's balances of USDC, USDT and ETH
  @Get(':id/balance')
  getWalletByIdWithBalance(
    @Param('id') id: string,
  ): IWallet & { balance: Record<string, number> } {
    return this.walletService.getWalletWithBalance(id);
  }

  // endpoint: {base_url}/wallets/:id/transactions/today
  // returns wallet's total transfer volume of USDC, USDT, and ETH in past 24 hours
  @Get(':id/transactions/today')
  getTodayTransaction(@Param('id') id: string): Record<string, number> {
    return this.walletService.getTransferVolume(id);
  }
}
