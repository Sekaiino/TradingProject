// Trade types
export interface ITrade {
    pairSymbol: string,
    sl: number,
    buyQuantity: number,
    buyPrice: number,
    totalSpend: number,
    side: string,
    date: Date,
    _id: string
}

export interface ITrades {
    trade: ITrade[]
}

// Coinconfig types
export interface IParameters {
    wallet_exposure: number,
    st_short_atr_window: number,
    st_short_atr_multiplier: number,
    short_ema_window: number,
    long_ema_window: number
}

export interface ICoinconfig {
    BTCUSDT: IParameters,
    ETHUSDT: IParameters,
    BNBUSDT: IParameters,
    XRPUSDT: IParameters,
    SOLUSDT: IParameters
}

export interface ICoinconfigs {
    coinconfig: ICoinconfig[]
}

// Wallet types
export interface IWallet {
    totalBalance: number,
    date: Date
}

export interface IWallets {
    wallet: IWallet[]
}

// Transactions types
export interface ITransaction {
    _id: string,
    type: string,
    amount: number,
    date: Date
}

export interface ITransactions {
    transactions: ITransaction[]
}