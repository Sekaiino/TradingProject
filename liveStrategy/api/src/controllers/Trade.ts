import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import Trade from "../models/Trade";

const createTrade = (req: Request, res: Response, next: NextFunction) => {
    const { pairSymbol, sl, buyQuantity, buyPrice, totalSpend, side, date } = req.body;

    const trade = new Trade({
        _id: new mongoose.Types.ObjectId(),
        pairSymbol,
        sl,
        buyQuantity,
        buyPrice,
        totalSpend,
        side,
        date
    });

    return trade
        .save()
        .then((trade) => res.status(201).json({ trade }))
        .catch((error) => res.status(500).json({ error }));
};

const readTrade = (req: Request, res: Response, next: NextFunction) => {
    const TradeId = req.params.tradeId;

    return Trade.findById(TradeId)
        .then((trade) => (trade ? res.status(200).json({ trade }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Trade.find()
        .then((trade) => res.status(200).json({ trade }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTrade = (req: Request, res: Response, next: NextFunction) => {
    const tradeId = req.params.tradeId;

    return Trade.findById(tradeId)
        .then((trade) => {
            if (trade) {
                trade.set(req.body);

                return trade
                    .save()
                    .then((trade) => res.status(201).json({ trade }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTrade = (req: Request, res: Response, next: NextFunction) => {
    const tradeId = req.params.tradeId;

    return Trade.findByIdAndDelete(tradeId)
        .then((trade) => (trade ? res.status(201).json({ trade, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createTrade, readTrade, readAll, updateTrade, deleteTrade };