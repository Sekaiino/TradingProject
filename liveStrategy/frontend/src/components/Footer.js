import {HashLink } from 'react-router-hash-link';
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="app-footer">
            <aside>
                <ul>
                    <h3><HashLink to="/#">Home</HashLink></h3>
                    <li><HashLink to="/#intro">Introduction</HashLink></li>
                    <li><HashLink to="/#trade">5 lasts trades</HashLink></li>
                </ul>
                <ul>
                    <h3><HashLink to="/trade#">Trades</HashLink></h3>
                    <li><HashLink to="/trade#wallet">Wallet evolution</HashLink></li>
                    <li><HashLink to="/trade#transactions">20 lasts trades</HashLink></li>
                    <li><HashLink to="/trade#trades">Historical transactions</HashLink></li>
                </ul>
                <ul>
                    <h3><HashLink to="/project_details#">Project details</HashLink></h3>
                    <li><HashLink to="/project_details#intro">Introduction</HashLink></li>
                    <li><HashLink to="/project_details#strategy">Trading strategy</HashLink></li>
                    <li><HashLink to="/project_details#development">Development steps</HashLink></li>
                    <li><HashLink to="/project_details#technology">Technology used</HashLink></li>
                </ul>
            </aside>
            <aside>
                <p>Powered by <b>Enzo Vullo</b></p>
                <ul className='network'>
                    <li><a href="https://github.com/evullo?tab=repositories" target="_blank" rel="noreferrer"><FaGithub /></a></li>
                    <li><a href="https://twitter.com/e_vullo_" target="_blank" rel="noreferrer"><FaTwitter /></a></li>
                    <li><a href="mailto:e.vullopro@gmail.com" target="_blank" rel="noreferrer"><FaEnvelope /></a></li>
                </ul>
            </aside>
        </footer>
    )
}
export default Footer;