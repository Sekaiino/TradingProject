import { useRequest } from "../hooks/useRequest";
import { Chart } from "react-google-charts";
import { IsPending } from "../components/IsPending";
import { Error } from "../components/Error";
import { ITrade, ITrades } from "../interface/Interface";

const Trade = () => {
    const { data: tradeData, isPending: tradeIsPending, error: tradeError } = useRequest('GET', 'http://localhost:8000/api/trade/get/');
    const trades = tradeData.constructor !== Array ? (tradeData as unknown as ITrades).trade : false;

    // const { data: walletData, isPending: walletIsPending, error: walletError } = useRequest('GET', 'http://localhost:8000/api/wallet/get/');
    // const wallets = walletData.constructor !== Array ? walletData.wallet : false;

    // const { data: transactionData, isPending: transactionIsPending, error: transactionError } = useRequest('GET', 'http://localhost:8000/api/transactions/get/');
    // const transactions = transactionData.constructor !== Array ? transactionData.transactions : false;

    const asset = [
        ["Date", "Assets"],
        ["today", 301.23]
    ];

    const options = {
        title: "Wallet evolution",
        backgroundColor: '#F5F7FA',
        vAxis: { minValue: 0 },
        chartArea: { width: "50%", height: "70%" },
    };

    return(
        <section className="trade" style={{width: "100vw"}}>
            <h2>Trading history</h2>
            <aside>
                <Chart 
                    chartType="AreaChart"
                    width="50vw"
                    height="50vh"
                    data={asset}
                    options={options}
                />
            </aside>
            <article className="transactions">
                <h3>Historical transactions</h3>
                <ul>
                    <li className="title">
                        <h4>Date</h4>
                        <h4>Type</h4>
                        <h4>Amount moved</h4>
                    </li>
                    <hr />
                </ul>
            </article>
            <article>
                <h3>Trades</h3>
                { tradeIsPending && <IsPending /> }
                { trades && 
                <ul>
                    <li className="title">
                        <h4>Date</h4>
                        <h4>Pair</h4>
                        <h4>StopLoss</h4>
                        <h4>Quantity bought</h4>
                        <h4>Price</h4>
                        <h4>Total spend</h4>
                        <h4>Side</h4>
                    </li>
                    <hr />
                    {(trades.map((trade: ITrade) => {
                        let style = trade.side === 'LONG' ? { backgroundColor: 'green' } : { backgroundColor: 'red' };
                        return (
                            <li style={style} key={trade._id}>
                            <p>{(trade.date).toString().replace("T", " ").replace("Z", " ")}</p>
                            <p>{trade.pairSymbol}</p>
                            <p>{trade.sl} $</p>
                            <p>{trade.buyQuantity} {(trade.pairSymbol).replace("USDT", "")}</p>
                            <p>{trade.buyPrice} $</p>
                            <p>~ {trade.totalSpend} $</p>
                            <p>{trade.side}</p>
                        </li>
                    )}
                    ))}
                </ul>
                }
                { tradeError && <Error /> }
            </article>
        </section>
    )
}

export { Trade };