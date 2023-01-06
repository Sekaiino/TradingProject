import useRequest from "../hooks/useAPI";
import Chart from "react-google-charts";
import IsPending from "../components/IsPending";
import Error from "../components/Error";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Trade = () => {
    const { data: tradeData, isPending: tradeIsPending, error: tradeError } = useRequest('GET', 'http://localhost:8000/api/trade/get/');
    const trades = tradeData.constructor !== Array ? tradeData.trade : false;

    const { data: walletData, isPending: walletIsPending, error: walletError } = useRequest('GET', 'http://localhost:8000/api/wallet/get/');
    const wallets = walletData.constructor !== Array ? walletData.wallet : false;

    const { data: transactionData, isPending: transactionIsPending, error: transactionError } = useRequest('GET', 'http://localhost:8000/api/transactions/get/');
    const transactions = transactionData.constructor !== Array ? transactionData.transactions : false;

    const { width } = useWindowDimensions();

    const chartHeight = width <= 700 ? "50%" : "70%";
    const chartWidth = width <= 700 ? "90vw" : "50vw";

    const asset = [
        ["Date", "Assets"]
    ];

    for (let index = 0; index < wallets.length; index++) {
        asset.push([wallets[index].date.toString().substring(5, 10), wallets[index].totalBalance]);
    }

    const options = {
        title: "Wallet evolution",
        backgroundColor: '#F5F7FA',
        vAxis: { minValue: 0 },
        chartArea: { width: "60%", height: chartHeight },
    };

    return(
        <section className="trade" style={{width: "100vw", overflowX: "hidden"}} id="wallet">
            <h2>Trading history</h2>
            <aside>
                {walletError && <Error />}
                {walletIsPending && <IsPending />}
                {walletData && 
                    <Chart 
                        chartType="AreaChart"
                        width= {chartWidth}
                        height="50vh"
                        data={asset}
                        options={options}
                    />
                }
            </aside>
            <article className="transactions" id="transactions">
                <h3>Historical transactions</h3>
                {transactionError && <Error />}
                {transactionIsPending && <IsPending />}
                {transactions &&
                    <ul>
                        <li className="title">
                            <h4>Date</h4>
                            <h4>Type</h4>
                            <h4>Amount moved</h4>
                        </li>
                        <hr />
                        { transactions.map((transaction) => {
                            return (
                                <li key={transaction._id}>
                                    <p>{(transaction.date).toString().substring(0, 10)}</p>
                                    <p>{transaction.type.toUpperCase()}</p>
                                    <p>{transaction.amount}$</p>
                                </li>
                            )} 
                        )}
                    </ul>
                }
            </article>
            <article id="trades">
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
                    {trades.slice((trades.length - 20), trades.length).map((trade) => {
                        let style = trade.side === 'LONG' ? { backgroundColor: 'green' } : { backgroundColor: 'red' };
                        return (
                            <li style={style} key={trade._id}>
                                <p>{(trade.date).toString().replace("T", " ").replace("Z", " ").substring(0, 16)}</p>
                                <p>{trade.pairSymbol}</p>
                                <p>{trade.sl} $</p>
                                <p>{trade.buyQuantity} {(trade.pairSymbol).replace("USDT", "")}</p>
                                <p>{trade.buyPrice} $</p>
                                <p>~ {trade.totalSpend} $</p>
                                <p>{trade.side}</p>
                            </li>
                        )}
                    )}
                </ul>
                }
                { tradeError && <Error /> }
            </article>
        </section>
    )
}

export default Trade;