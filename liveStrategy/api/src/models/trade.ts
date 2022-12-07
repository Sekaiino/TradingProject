import mongoose, { Document, Schema } from 'mongoose';

export interface ITrade {
    pairSymbol: string,
    sl: number,
    buyPrice: number,
    side: string,
    date: Date
};

export interface ITradeModel extends ITrade, Document {};

const TradeSchema: Schema = new Schema(
    {
        pairSymbol: { type: String, required: true },
        sl: { type: Number, required: true, default: null },
        buyPrice: { type: Number, required: true },
        side: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now }
    },
    { versionKey: false }
);

export default mongoose.model<ITradeModel>('Trade', TradeSchema);