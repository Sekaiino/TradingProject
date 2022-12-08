import mongoose, { Document, Schema } from 'mongoose';

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
};

export interface ICoinconfigModel extends ICoinconfig, Document {};

const CoinconfigSchema: Schema = new Schema(
    {
        BTCUSDT: {
            wallet_exposure: { type: Number, required: true },
            st_short_atr_window: { type: Number, required: true },
            st_short_atr_multiplier: { type: Number, required: true },
            short_ema_window: { type: Number, required: true },
            long_ema_window: { type: Number, required: true }
        },
        ETHUSDT: {
            wallet_exposure: { type: Number, required: true },
            st_short_atr_window: { type: Number, required: true },
            st_short_atr_multiplier: { type: Number, required: true },
            short_ema_window: { type: Number, required: true },
            long_ema_window: { type: Number, required: true }
        },
        BNBUSDT: {
            wallet_exposure: { type: Number, required: true },
            st_short_atr_window: { type: Number, required: true },
            st_short_atr_multiplier: { type: Number, required: true },
            short_ema_window: { type: Number, required: true },
            long_ema_window: { type: Number, required: true }
        },
        XRPUSDT: {
            wallet_exposure: { type: Number, required: true },
            st_short_atr_window: { type: Number, required: true },
            st_short_atr_multiplier: { type: Number, required: true },
            short_ema_window: { type: Number, required: true },
            long_ema_window: { type: Number, required: true }
        },
        SOLUSDT: {
            wallet_exposure: { type: Number, required: true },
            st_short_atr_window: { type: Number, required: true },
            st_short_atr_multiplier: { type: Number, required: true },
            short_ema_window: { type: Number, required: true },
            long_ema_window: { type: Number, required: true }
        }
    },
    { versionKey: false }
);

export default mongoose.model<ICoinconfigModel>('Coinconfig', CoinconfigSchema);