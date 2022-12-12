import { Link } from "react-router-dom";

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
                    <summary>Algorithm development</summary>
                    <ul>
                        <li>Python 3.9</li>
                        <li>requests Python library for API call</li>
                        <li>ta Python library for technical analysis</li>
                    </ul>
                </details>
                <details>
                    <summary>Backend</summary>
                    <ul>
                        <li>Typescript and REST</li>
                        <li>MongoDB + mongoose</li>
                        <li>Express library</li>
                    </ul>
                </details>
                <details>
                    <summary>Frontend</summary>
                    <ul>
                        <li>React in Typescript template</li>
                        <li>Sass for the style</li>
                        <li>Background generated on<a href="https://www.svgbackgrounds.com/">&nbsp;SVG background</a></li>
                        <li>Google API for the font-family</li>
                        <li>React icons library for the different icons</li>
                    </ul>
                </details>
                <details>
                    <summary>Deployment</summary>
                    <ul>
                        <li>Amazon AWS EC2 instance is hosting the website</li>
                        <li>Amazon AWS Elastic IP is linking IP addresses</li>
                        <li>Nginx is used to deploy the website</li>
                        <li>Domain name purchased on Ionos</li>
                    </ul>
                </details>
                <details>
                    <summary>Credits</summary>
                    <ul>
                        <li>
                            <a href="https://www.youtube.com/@cryptorobotfr">@CryptoRobotFr&nbsp;</a> helped me to understand 
                            and apply the trading strategy with their useful tutorial
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@NetNinja/featured">@NetNinja&nbsp;</a> helped me to understand the
                            React and mongoDB basis to build this project
                        </li>
                        <li>
                            <a href="https://www.youtube.com/watch?v=72_5_YuDCNA&t=2532s&ab_channel=TheNerdyCanuck">This video&nbsp;</a>
                            helped me to build the basic API to make frontend, backend and the trading algorithm interact
                        </li>
                        <li>StackOverflow solved a lot of my problems during this journey</li>
                    </ul>
                </details>
            </article>
            <aside></aside>
        </section>
    )
}

export { ProjectDetails };