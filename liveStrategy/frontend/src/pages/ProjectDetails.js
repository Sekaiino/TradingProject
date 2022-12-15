import { IoIosArrowDropright } from 'react-icons/io';
import { FaPython, FaReact, FaSass, FaGoogle, FaAws, FaYoutube, FaStackOverflow, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiSvg, SiNginx } from 'react-icons/si';
import { SlGraph, SlTarget } from 'react-icons/sl';
import { BsGraphUp, BsGraphDown } from 'react-icons/bs';
import { MdDomain } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ProjectDetails = () => {
    return(
        <section>
            <h2>Project Details</h2>
            <article id="intro">
                <h3>Introduction</h3>
                <p>
                    First of all, you have to know that I’m just a beginner in the technologies 
                    used for this project and so, the different code I wrote might not be perfect, please be forgiving!
                    I’m in my first year of computer studies and I got interested in code and in the
                    crypto market about 2 years ago, since I go from personal project to personal 
                    project and this is the first one I’m really proud of. It combines my 2 centers 
                    of interest to create an algorithmic trading directly on binance, I detail it 
                    fully below. Enjoy your reading!
                </p>
            </article>

            <article id="strategy">
                <h3>Trading strategy</h3>
                <p>
                    I used the strategy of the <strong>SuperReversal</strong> which is a strategy developed and detailed by&nbsp;
                    <a href="https://crypto-robot.com/blog/superreversal-strategie-crypto" target="_blank" rel="noreferrer">CryptoRobotFR</a>, 
                    I will detail it again here with the change I made to it.
                </p>
                <h4>1. Strategy indicators</h4>
                <ul>
                    <li><SlGraph className='icons'/>Short moving average</li>
                    <li><SlGraph className='icons'/>Long moving average</li>
                    <li><SlGraph className='icons'/>SuperTrend</li>
                </ul>
                <h4>2. Optimizing trade inflows and outflows</h4>
                <p>
                    The goal of the strategy is to detect and take advantage of trends but trend strategies usually have one problem, 
                    the <strong>false signals</strong>. This strategy is designed to avoid as much as possible these false signals via 
                    an optimized trade entry. Indeed, instead of entering a position as soon as our indicators detect a trend, whether 
                    bearish or bullish, we expect a <strong>pullback</strong>.
                    <br /><br />
                    Here is an illustration of a <strong>pullback</strong>, I let you make your own research about it if you don't understand it.
                </p>
                <img src={require('../images/pullback.jpg')} alt="pullback" />
                <p>
                    We use these pullback entry points but also pullback exits to limit losses on false signals but also increase potential gains.
                    In addition, the Super Reversal always returns to position via <strong>limit</strong> orders so <strong>Maker</strong> which 
                    will greatly reduce costs.
                </p>
                <h4>3. Indicators of the Super Reversal strategy</h4>
                <p>
                    This strategy uses two moving averages and a SuperTrend. The moving averages are simply an average of the last X closing.
                    However the SuperTrend is a little less known indicator that I will quickly detail. The SuperTrend is an ATR-based indicator 
                    that measures the volatility of an asset over a period of time.
                    <br /><br />
                    The SuperTrend can be either <strong>green (positive)</strong> in this case it is equal to the maximum closing price minus the ATR 
                    over an X time interval. It can also be <strong>red (negative)</strong> in this case it is equal to the minimum closing price plus 
                    the ATR over an X time interval. The color of the SuperTrend changes when the closing breaks down the green SuperTrend or breaks up 
                    the red SuperTrend.
                    <br /><br />
                    This is a very good indicator of trends and significant levels.
                </p>
                <h4>4. Strategy rules</h4>
                <p>Rules are pretty simple, I'll detail them below</p>
                <br />
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Open&nbsp;<strong>LONG</strong>&nbsp;(place limit order at pullback)</summary>
                    <ul>
                        <li><BsGraphUp className='icons'/>SuperTrend must be&nbsp;<strong>positive</strong>&nbsp;(green)</li>
                        <li><BsGraphUp className='icons'/>Short moving average must be&nbsp;<strong>above</strong>&nbsp;long moving average</li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Open&nbsp;<strong>SHORT</strong>&nbsp;(place limit order at pullback)</summary>
                    <ul>
                        <li><BsGraphDown className='icons'/>SuperTrend must be&nbsp;<strong>negative</strong>&nbsp;(red)</li>
                        <li><BsGraphDown className='icons'/>Short moving average must be&nbsp;<strong>below</strong>&nbsp;long moving average</li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Close&nbsp;<strong>LONG</strong>&nbsp;(place limit order at pullback)</summary>
                    <ul>
                        <li>
                            <BsGraphUp className='icons'/>SuperTrend must be&nbsp;<strong>negative</strong>&nbsp;(red) OR short moving average must 
                            be&nbsp;<strong>below</strong>&nbsp;long moving average
                        </li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Open&nbsp;<strong>SHORT</strong>&nbsp;(place limit order at pullback)</summary>
                    <ul>
                        <li>
                            <BsGraphDown className='icons'/>SuperTrend must be&nbsp;<strong>positive</strong>&nbsp;(green) OR short moving average must 
                            be&nbsp;<strong>above</strong>&nbsp;long moving average
                        </li>
                    </ul>
                </details>
                <br />
                <p>
                    Each indicator is configurable according to your desires but you can also see the different parameters I use for each of the indicators 
                    and each of the pairs that the bot trade on the&nbsp; <Link to="/parameters">parameters</Link> page.
                </p>
                <br />
                <p>
                    I also used a search algorithm for supports and resistors to position my <strong>stop loss</strong> and <strong>take profit</strong>, I will 
                    not go into the details here simply say that the stop loss is positioned at the closest support and it is the same with the closest resistance 
                    for take profit.
                </p>
                <h4>5. The results of the trading strategy</h4>
                <p>
                    The strategy is tested over the period between January 2018 and mid-November 2022 on <strong>5 assets</strong> in order to smooth gains and losses.
                    This gives an important history knowing that it has <strong>1h timeframe</strong>. The backtest starts with a total capital of 1,000 USD and reaches 
                    more than <strong>100,000 USD</strong> or a x100 or +10,000%. Below are the details of the results of the strategy.
                </p>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Strategy details</summary>
                    <ul>
                        <li><SlTarget className="icons" />Period: from 2017-08-17 00:00:00 to 2022-11-23 00:00:00</li>
                        <li><SlTarget className="icons" />Initial wallet: 1000.0 $</li>
                        <li><SlTarget className="icons" />Final wallet: 139312.3 $</li>
                        <li><SlTarget className="icons" />Performance vs US dollar: 13831.23 %</li>
                        <li><SlTarget className="icons" />Sharpe Ratio: 2.05</li>
                        <li><SlTarget className="icons" />Worst Drawdown T|D: -35.53% | -39.95%</li>
                        <li><SlTarget className="icons" />Buy and hold performance: 275.58 %</li>
                        <li><SlTarget className="icons" />Performance vs buy and hold: 3609.24 %</li>
                        <li><SlTarget className="icons" />Total trades on the period: 1327</li>
                        <li><SlTarget className="icons" />Global Win rate: 37.38 %</li>
                        <li><SlTarget className="icons" />Average Profit: 2.41 %</li>
                    </ul>
                </details>
                <p>
                Without going into the details of each trade because it would take me an eternity for everything detailed, we see that this strategy has very good results 
                even if it is absolutely <strong>not infallible</strong>.
                </p>
                <h4>6. Conclusion</h4>
                <p>
                    A trend strategy like this one will be very effective during bearish and bullish periods but will have a little more difficulty to come out of good 
                    results in quieter periods even if we have seen that on the past, it produces very good results. This page is <strong>in no way a financial advice</strong>, 
                    it is simply intended to tell my journey and my project of automation of the <strong>SuperReversal</strong>. This strategy is intended to be improved and 
                    this page will be <strong>updated</strong> as my skills and strategy evolve. I hope you enjoyed your reading and the next section is waiting for you to explain 
                    the development in detail.
                </p>
            </article>

            <article id="development">
                <h3>Development steps</h3>
                <p>
                    Before we start, you need to know that I use the <strong>Python language</strong> for the trading algorithm, a <strong>REST API</strong> written in Typescript 
                    connected to a <strong>MongoDB database</strong> for storing different information and <strong>React</strong> for the frontend.
                </p>
                <h4>1. Rewrite the strategy in the backtest</h4>
                <p>
                    This part was not very complicated since @CryptoRobotFr provides all the necessary tools for the proper realization of this part. I just had to adapt my 
                    parameters to the different pairs traded and find which combination gave the best results in the past both in gains and losses. In some cases the sum generated 
                    in the end was colossal but the drwdown was also very high which produces an unreliable strategy.
                </p>
                <h4>2. Code the library to communicate with the Binance API</h4>
                <p>
                    This part was a big challenge because the library proposed by @CryptoRobotFr was developed to interact with FTX via the <strong>CCXT library</strong>, I therefore 
                    had to inquire about the data to be passed in parameters in my requests so that <strong>limit and market orders</strong> as well as stop loss and take profit are 
                    passed without problems. For the moment, this modified library uses both <strong>CCXT and python-binance</strong> to manage both orders in the market 
                    and <strong>OHLCV</strong> (open, high, low, close, volume) data management or the conversion of the amount to be purchased or the price to a precision accepted by 
                    the exchange.
                </p>
                <h4>3. Code the main strategy</h4>
                <p>
                    I also had trouble with this part because I wanted to integrate a kind of object-oriented programming. I am a beginner in the field so everything I have done is far from perfect and I invite you to open pull requests on the Github code in order to perfect the project.
                </p>
                <br />
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />I did my best to get a functional strategy, it breaks down as follows:</summary>
                    <ul>
                        <li><SlTarget className="icons" />Load the &nbsp;<strong>trading parameters</strong>&nbsp; of the different pairs via an API request.</li>
                        <li><SlTarget className="icons" />Load the environment variables needed for the Binance API connection. (.env file)</li>
                        <li><SlTarget className="icons" />Initialize the various variables and objects needed to run the strategy.</li>
                        <li><SlTarget className="icons" />Know on which pairs the algorithm is already in position.</li>
                        <li><SlTarget className="icons" />Iterate on the different pairs on which the algorithm is not in position.</li>
                        <li><SlTarget className="icons" />For each pair, check the opening condition of a LONG or SHORT.</li>
                        <li><SlTarget className="icons" />If opening conditions are met, calculate the stop loss according to the closest support(LONG) or resistance(SHORT).</li>
                        <li><SlTarget className="icons" />Pass the limit order and set the stop loss.</li>
                        <li><SlTarget className="icons" />Save the order placement in the database via an API request.</li>
                        <li><SlTarget className="icons" />For each open position, check the closing condition of LONG or SHORT.</li>
                        <li><SlTarget className="icons" />If closure conditions are met, place the sales limit order.</li>
                    </ul>
                </details>
                <br />
                <p>
                    Every day at <strong>midnight CET</strong>, the algorithm runs an API request to record the total $ held by the wallet.
                </p>
                <br />
                <p>
                    I have not extremely detailed the code I wrote because the <strong>Github repository</strong> of the project is accessible 
                    and <strong>open to any improvement proposed</strong> in pull request. I am also <strong>not responsible</strong> for your 
                    gains or losses if you choose to deploy this strategy on your own account. You can follow the evolution of mine through this 
                    website.
                </p>
                <h4>4. Code the REST API</h4>
                <p></p>
                <h4>5. Create the React App for the frontend</h4>
                <p></p>
                <h4>6. Deploy the App</h4>
                <p></p>
            </article>

            <article id="technology">
                <h3>Technology used</h3>
                <p>
                    All the technologies used in my project as well as the links to the tutorials and resources that helped me are detailed below. <br />
                    If you have any questions feel free to contact me!
                </p>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Algorithm development</summary>
                    <ul>
                        <li><FaPython className='icons' />Python 3.9</li>
                        <li><FaPython className='icons' />requests Python library for API call</li>
                        <li><FaPython className='icons' />ta Python library for technical analysis</li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Backend</summary>
                    <ul>
                        <li><SiTypescript className='icons' />Typescript and REST</li>
                        <li><SiMongodb className='icons' />MongoDB + mongoose</li>
                        <li><SiTypescript className='icons' />Express library</li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Frontend</summary>
                    <ul>
                        <li><FaReact className='icons' />React</li>
                        <li><FaSass className='icons' />Sass for the style</li>
                        <li><SiSvg className='icons' />Background generated on&nbsp;<a href="https://www.svgbackgrounds.com/" target="_blank" rel="noreferrer">SVG background</a></li>
                        <li><FaGoogle className='icons' />Google API for the font-family</li>
                        <li><FaReact className='icons' />React icons library for the different icons</li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Deployment</summary>
                    <ul>
                        <li><FaAws className='icons' />Amazon AWS EC2 instance is hosting the website, the API and the python script</li>
                        <li><FaAws className='icons' />Amazon AWS Elastic IP is linking IP addresses</li>
                        <li><SiNginx className='icons' />Nginx is used to deploy the website</li>
                        <li><MdDomain className='icons' />Domain name purchased on Ionos</li>
                    </ul>
                </details>
                <details>
                    <summary><IoIosArrowDropright className="drop_down" />Credits</summary>
                    <ul>
                        <li><FaYoutube className='icons' />
                            <a href="https://www.youtube.com/@cryptorobotfr" target="_blank" rel="noreferrer">@CryptoRobotFr</a>&nbsp;helped me to understand 
                            and apply the trading strategy with their useful tutorial
                        </li>
                        <li><FaYoutube className='icons' />
                            <a href="https://www.youtube.com/@NetNinja/featured" target="_blank" rel="noreferrer">@NetNinja</a>&nbsp;helped me to understand the
                            React and mongoDB basis to build this project
                        </li>
                        <li><FaYoutube className='icons' />
                            <a href="https://www.youtube.com/watch?v=72_5_YuDCNA&t=2532s&ab_channel=TheNerdyCanuck" target="_blank" rel="noreferrer">This video</a>&nbsp;
                            helped me to build the basic API to make frontend, backend and the trading algorithm interact
                        </li>
                        <li><FaStackOverflow className='icons' />StackOverflow solved a lot of my problems during this journey</li>
                    </ul>
                </details>
            </article>
            <aside>
                <h4>Source code:</h4>
                <a href="https:"><FaGithub className='icons'/>&nbsp;Github</a>
            </aside>
        </section>
    )
}

export default ProjectDetails;