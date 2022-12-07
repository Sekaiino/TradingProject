import mongoose, { Document, Schema } from 'mongoose';

export interface IWallet {
    totalBalance: number,
    date: Date
}

export interface IWalletModel extends IWallet, Document {};

const WalletSchema: Schema = new Schema(
    {
        totalBalance: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now }
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IWalletModel>('Wallet', WalletSchema);