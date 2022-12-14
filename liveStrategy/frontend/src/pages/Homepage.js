import Error from "../components/Error";
import IsPending from "../components/IsPending";
import useRequest from "../hooks/useRequest";

const Homepage = () => {

    const { data, isPending, error } = useRequest('GET', 'http://localhost:8000/api/trade/get/');
    const trades = data.constructor !== Array ? data.trade : false;
    let counter = 1;

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
                { isPending && <IsPending /> }
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
                    {(trades.map((trade) => {
                        let style = {}
                        if(counter > 5) {
                            style = { display: 'none' };
                        } else {
                            style = trade.side === 'LONG' ? { backgroundColor: 'green' } : { backgroundColor: 'red' };
                        }
                        counter++;
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
                { error && <Error /> }
            </article>
        </section>
    )
};

export default Homepage;