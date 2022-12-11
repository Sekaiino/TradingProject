import React from "react";
import { IsPending } from "../components/IsPending";
import { Error } from '../components/Error';
import { useRequest } from "../hooks/useRequest";

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

export interface ICoinconfigs {
    coinconfig: ICoinconfig[]
}

const Parameters = () => {
    const { data, isPending, error } = useRequest("GET", "http://localhost:8000/api/coinconfig/get/");
    console.log(data);
    const params: ICoinconfig = (data as unknown as ICoinconfigs).coinconfig[0];

    return(
        <div>
            { error && <Error /> }
            { isPending && <IsPending /> }
            { data && 
                <section className="parameter">
                    <h2>Parameters</h2>
                    <article>
                        <h3>Infos</h3>
                        <p>
                            Here are the different parameters used for every pair traded by my algorithm.
                            Every pair has specific parameters to apply to the different indicators to manage
                            the risk but also to optimize every trade and the winrate of the bot.
                        </p>
                    </article>
                    <form>
                        <div className="pair-params">
                            <h3>BTC/USDT</h3>
                            <label htmlFor="wexp1">Wallet exposure: <input type="number" name="wexp1" id="wexp1" value={params.BTCUSDT.wallet_exposure} disabled /></label>
                            <label htmlFor="atrwind1">Short atr window: <input type="number" name="atrwind1" id="atrwind1" value={params.BTCUSDT.st_short_atr_window} disabled /></label>
                            <label htmlFor="atrmult1">Short atr multiplier: <input type="number" name="atrmult1" id="atrmult1" value={params.BTCUSDT.st_short_atr_multiplier} disabled /></label>
                            <label htmlFor="shortema1">Short ema window: <input type="number" name="shortema1" id="shortema1" value={params.BTCUSDT.short_ema_window} disabled /></label>
                            <label htmlFor="longema1">Long ema window: <input type="number" name="longema1" id="longema1" value={params.BTCUSDT.long_ema_window} disabled /></label>
                        </div>
                        <div className="pair-params">
                            <h3>ETH/USDT</h3>
                            <label htmlFor="wexp2">Wallet exposure: <input type="number" name="wexp2" id="wexp2" value={params.ETHUSDT.wallet_exposure} disabled /></label>
                            <label htmlFor="atrwind2">Short atr window: <input type="number" name="atrwind2" id="atrwind2" value={params.ETHUSDT.st_short_atr_window} disabled /></label>
                            <label htmlFor="atrmult2">Short atr multiplier: <input type="number" name="atrmult2" id="atrmult2" value={params.ETHUSDT.st_short_atr_multiplier} disabled /></label>
                            <label htmlFor="shortema2">Short ema window: <input type="number" name="shortema2" id="shortema2" value={params.ETHUSDT.short_ema_window} disabled /></label>
                            <label htmlFor="longema2">Long ema window: <input type="number" name="longema2" id="longema2" value={params.ETHUSDT.long_ema_window} disabled /></label>
                        </div>
                        <div className="pair-params">
                            <h3>BNB/USDT</h3>
                            <label htmlFor="wexp3">Wallet exposure: <input type="number" name="wexp3" id="wexp3" value={params.BNBUSDT.wallet_exposure} disabled /></label>
                            <label htmlFor="atrwind3">Short atr window: <input type="number" name="atrwind3" id="atrwind3" value={params.BNBUSDT.st_short_atr_window} disabled /></label>
                            <label htmlFor="atrmult3">Short atr multiplier: <input type="number" name="atrmult3" id="atrmult3" value={params.BNBUSDT.st_short_atr_multiplier} disabled /></label>
                            <label htmlFor="shortema3">Short ema window: <input type="number" name="shortema3" id="shortema3" value={params.BNBUSDT.short_ema_window} disabled /></label>
                            <label htmlFor="longema3">Long ema window: <input type="number" name="longema3" id="longema3" value={params.BNBUSDT.long_ema_window} disabled /></label>
                        </div>
                        <div className="pair-params">
                            <h3>XRP/USDT</h3>
                            <label htmlFor="wexp4">Wallet exposure: <input type="number" name="wexp4" id="wexp4" value={params.XRPUSDT.wallet_exposure} disabled /></label>
                            <label htmlFor="atrwind4">Short atr window: <input type="number" name="atrwind4" id="atrwind4" value={params.XRPUSDT.st_short_atr_window} disabled /></label>
                            <label htmlFor="atrmult4">Short atr multiplier: <input type="number" name="atrmult4" id="atrmult4" value={params.XRPUSDT.st_short_atr_multiplier} disabled /></label>
                            <label htmlFor="shortema4">Short ema window: <input type="number" name="shortema4" id="shortema4" value={params.XRPUSDT.short_ema_window} disabled /></label>
                            <label htmlFor="longema4">Long ema window: <input type="number" name="longema4" id="longema4" value={params.XRPUSDT.long_ema_window} disabled /></label>
                        </div>
                        <div className="pair-params">
                            <h3>SOL/USDT</h3>
                            <label htmlFor="wexp5">Wallet exposure: <input type="number" name="wexp5" id="wexp5" value={params.SOLUSDT.wallet_exposure} disabled  /></label>
                            <label htmlFor="atrwind5">Short atr window: <input type="number" name="atrwind5" id="atrwind5" value={params.SOLUSDT.st_short_atr_window} disabled /></label>
                            <label htmlFor="atrmult5">Short atr multiplier: <input type="number" name="atrmult5" id="atrmult5" value={params.SOLUSDT.st_short_atr_multiplier} disabled  /></label>
                            <label htmlFor="shortema5">Short ema window: <input type="number" name="shortema5" id="shortema5" value={params.SOLUSDT.short_ema_window} disabled /></label>
                            <label htmlFor="longema5">Long ema window: <input type="number" name="longema5" id="longema5" value={params.SOLUSDT.long_ema_window} disabled /></label>
                        </div>
                    </form>
                </section>
            }
        </div>
    )
}

export { Parameters };