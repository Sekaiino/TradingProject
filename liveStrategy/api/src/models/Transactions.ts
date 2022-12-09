import mongoose, { Document, Schema } from 'mongoose';

export interface ITransactions {
    type: string,
    amount: number,
    date: Date
};

export interface ITransactionsModel extends ITransactions, Document {};

const TransactionsSchema: Schema = new Schema(
    {
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true, default: Date.now }
    },
    { versionKey: false }
);

export default mongoose.model<ITransactionsModel>('Transactions', TransactionsSchema);