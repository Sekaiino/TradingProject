import { useRequest } from "../hooks/useRequest";

export interface ITrade {
    pairSymbol: string,
    sl: number,
    buyQuantity: number,
    buyPrice: number,
    totalSpend: number,
    side: string,
    date: Date,
    _id: string
}

export interface ITrades {
    trade: ITrade[]
}

const Homepage = () => {

    const { data, isPending, error } = useRequest('GET', 'http://localhost:8000/api/trade/get/');
    const trades = (data as unknown as ITrades).trade;

    return(
        <section className="home">
            <h2>Homepage</h2>
            <article id="intro">
                <h3>Introduction</h3>
                <aside>
                    <p> 
                        This website is most likely a blog tracing my project of an automated trading bot.
                        Here, I will show you the details of the project, the different problems I faced and
                        what I did to resolve them in the project details section. But you will also be able 
                        to see the source code and follow my wallet evolution to see if the bot is working fine.
                        I think it's good for a project introduction, I let you discover the project by yourself 
                        by navigating throught the website.
                    </p>
                </aside>
            </article>
            <article id="trade">
                <h3>Lasts trades</h3>
                { isPending && <span className="loading">Loading...</span> }
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
                        let style;
                        trade.side === 'LONG' ? style = { backgroundColor: 'green' } : style = { backgroundColor: 'red' };
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
                { error && <h4>An error occured while fetching data. please try again later</h4> }
            </article>
        </section>
    )
};

export {Homepage};