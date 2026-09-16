export type PaperSignal = 'long' | 'short' | 'close';

export interface PaperAccount {
  profileId: string;
  exchange: string;
  quoteCurrency: string;
  initialBalance: number;
  cash: number;
  createdAt: number;
}

export interface PaperPosition {
  profileId: string;
  pair: string;
  side: 'long' | 'short';
  amount: number;
  entryPrice: number;
  openedAt: number;
}

export interface PaperTrade {
  id?: number;
  profileId: string;
  pair: string;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  quoteAmount: number;
  pnl: number;
  createdAt: number;
}

export interface PaperPositionView extends PaperPosition {
  markPrice: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
}

export interface PaperAccountView {
  account: PaperAccount;
  positions: PaperPositionView[];
  equity: number;
  unrealizedPnl: number;
  realizedPnl: number;
  returnPercent: number;
  trades: PaperTrade[];
}
