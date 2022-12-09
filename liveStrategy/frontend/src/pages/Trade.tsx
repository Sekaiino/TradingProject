import { useRequest } from "../hooks/useRequest";
import { Chart } from "react-google-charts";

const Trade = () => {
    // const { trade, isPending, error } = useRequest('GET', 'http://localhost:8000/api/trade/get/');
    // const trades = trade.trade;
    // const { wallet, isPending, error } = useRequest('GET', 'http://localhost:8000/api/wallet/get/');
    // const wallets = wallet.wallet;

    const data = [
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
                    data={data}
                    options={options}
                />
            </aside>
            <article className="transactions">
                <h3>Historical transactions</h3>
                <ul>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                </ul>
            </article>
            <article>
                <h3>Trades</h3>
                <ul>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                </ul>
            </article>
        </section>
    )
}

export { Trade };