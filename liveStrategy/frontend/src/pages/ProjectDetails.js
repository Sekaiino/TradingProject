import { IoIosArrowDropright } from 'react-icons/io';
import { FaPython, FaReact, FaSass, FaGoogle, FaAws, FaYoutube, FaStackOverflow, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiSvg, SiNginx } from 'react-icons/si';
import { SlGraph } from 'react-icons/sl';
import { BsGraphUp, BsGraphDown } from 'react-icons/bs';
import { MdDomain } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ProjectDetails = () => {
    return(
        <section>
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
                    The strategy is tested over the period between January 2018 and mid-November 2022 on 5 assets in order to smooth gains and losses. This gives an 
                    important history knowing that it has 1h timeframe.
                </p>
            </article>

            <article id="development">
                <h3>Development steps</h3>
                <p></p>
            </article>

            <article id="technology">
                <h3>Technology used</h3>
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
                        <li><FaAws className='icons' />Amazon AWS EC2 instance is hosting the website</li>
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