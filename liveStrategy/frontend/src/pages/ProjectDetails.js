import { IoIosArrowDropright } from 'react-icons/io';
import { FaPython, FaReact, FaSass, FaGoogle, FaAws, FaYoutube, FaStackOverflow, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiSvg, SiNginx } from 'react-icons/si';
import { MdDomain } from 'react-icons/md';

const ProjectDetails = () => {
    return(
        <section>
            <article id="intro">
                <h3>Introduction</h3>
                <p></p>
            </article>
            <article id="strategy">
                <h3>Trading strategy</h3>
                <p></p>
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
                        <li><FaReact className='icons' />React in Typescript template</li>
                        <li><FaSass className='icons' />Sass for the style</li>
                        <li><SiSvg className='icons' />Background generated on&nbsp;<a href="https://www.svgbackgrounds.com/">SVG background</a></li>
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
                            <a href="https://www.youtube.com/@cryptorobotfr">@CryptoRobotFr</a>&nbsp;helped me to understand 
                            and apply the trading strategy with their useful tutorial
                        </li>
                        <li><FaYoutube className='icons' />
                            <a href="https://www.youtube.com/@NetNinja/featured">@NetNinja</a>&nbsp;helped me to understand the
                            React and mongoDB basis to build this project
                        </li>
                        <li><FaYoutube className='icons' />
                            <a href="https://www.youtube.com/watch?v=72_5_YuDCNA&t=2532s&ab_channel=TheNerdyCanuck">This video</a>&nbsp;
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