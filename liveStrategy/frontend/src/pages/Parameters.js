import IsPending from "../components/IsPending";
import Error from '../components/Error';
import useRequest from "../hooks/useAPI";

const Parameters = () => {
    const { data, isPending, error } = useRequest("GET", "http://localhost:8000/api/coinconfig/get/");
    const params = data.constructor !== Array ? data.coinconfig[0] : false;

    return(
        <div>
            { error && <Error /> }
            { isPending && <IsPending /> }
            { params &&
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
                    <aside>
                        <div className="pair-params">
                            <h3>BTC/USDT</h3>
                            <p>Wallet exposure: <b>{params.BTCUSDT.wallet_exposure}</b></p>
                            <p>Short ATR window: <b>{params.BTCUSDT.st_short_atr_window}</b></p>
                            <p>Short ATR multiplier: <b>{params.BTCUSDT.st_short_atr_multiplier}</b></p>
                            <p>Short EMA window: <b>{params.BTCUSDT.short_ema_window}</b></p>
                            <p>Long EMA window: <b>{params.BTCUSDT.long_ema_window}</b></p>
                        </div>
                        <div className="pair-params">
                            <h3>ETH/USDT</h3>
                            <p>Wallet exposure: <b>{params.ETHUSDT.wallet_exposure}</b></p>
                            <p>Short ATR window: <b>{params.ETHUSDT.st_short_atr_window}</b></p>
                            <p>Short ATR multiplier: <b>{params.ETHUSDT.st_short_atr_multiplier}</b></p>
                            <p>Short EMA window: <b>{params.ETHUSDT.short_ema_window}</b></p>
                            <p>Long EMA window: <b>{params.ETHUSDT.long_ema_window}</b></p>
                        </div>
                        <div className="pair-params">
                            <h3>BNB/USDT</h3>
                            <p>Wallet exposure: <b>{params.BNBUSDT.wallet_exposure}</b></p>
                            <p>Short ATR window: <b>{params.BNBUSDT.st_short_atr_window}</b></p>
                            <p>Short ATR multiplier: <b>{params.BNBUSDT.st_short_atr_multiplier}</b></p>
                            <p>Short EMA window: <b>{params.BNBUSDT.short_ema_window}</b></p>
                            <p>Long EMA window: <b>{params.BNBUSDT.long_ema_window}</b></p>
                        </div>
                        <div className="pair-params">
                            <h3>XRP/USDT</h3>
                            <p>Wallet exposure: <b>{params.XRPUSDT.wallet_exposure}</b></p>
                            <p>Short ATR window: <b>{params.XRPUSDT.st_short_atr_window}</b></p>
                            <p>Short ATR multiplier: <b>{params.XRPUSDT.st_short_atr_multiplier}</b></p>
                            <p>Short EMA window: <b>{params.XRPUSDT.short_ema_window}</b></p>
                            <p>Long EMA window: <b>{params.XRPUSDT.long_ema_window}</b></p>
                        </div>
                        <div className="pair-params">
                            <h3>SOL/USDT</h3>
                            <p>Wallet exposure: <b>{params.SOLUSDT.wallet_exposure}</b></p>
                            <p>Short ATR window: <b>{params.SOLUSDT.st_short_atr_window}</b></p>
                            <p>Short ATR multiplier: <b>{params.SOLUSDT.st_short_atr_multiplier}</b></p>
                            <p>Short EMA window: <b>{params.SOLUSDT.short_ema_window}</b></p>
                            <p>Long EMA window: <b>{params.SOLUSDT.long_ema_window}</b></p>
                        </div>
                    </aside>
                </section>
            }
        </div>
    )
}

export default Parameters;