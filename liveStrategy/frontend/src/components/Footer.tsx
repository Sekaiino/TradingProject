import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="app-footer">
            <aside>
                <ul>
                    <h3><Link to="/">Home</Link></h3>
                    <li><Link to={{ pathname: "/", hash: "#intro" }}>Introduction</Link></li>
                    <li><Link to={{ pathname: "/", hash: "#trade" }}>5 lasts trades</Link></li>
                </ul>
                <ul>
                    <h3><Link to="">Trades</Link></h3>
                    <li><Link to="">Wallet evolution</Link></li>
                    <li><Link to="">20 lasts trades</Link></li>
                    <li><Link to="">Historical transactions</Link></li>
                </ul>
                <ul>
                    <h3><Link to="/project_details">Project details</Link></h3>
                    <li><Link to={{ pathname: "/project_details", hash: "#intro" }}>Introduction</Link></li>
                    <li><Link to={{ pathname: "/project_details", hash: "#strategy" }}>Trading strategy</Link></li>
                    <li><Link to={{ pathname: "/project_details", hash: "#development" }}>Development steps</Link></li>
                    <li><Link to={{ pathname: "/project_details", hash: "#technology" }}>Technology used</Link></li>
                    <li><Link to={{ pathname: "/project_details", hash: "#credit" }}>credit</Link></li>
                </ul>
            </aside>
            <aside>
                <p>Powered by <b>Enzo Vullo</b></p>
                <ul className='network'>
                    <li><Link to=""><FaGithub /></Link></li>
                    <li><Link to=""><FaTwitter /></Link></li>
                    <li><Link to=""><FaLinkedin /></Link></li>
                    <li><Link to=""><FaEnvelope /></Link></li>
                </ul>
            </aside>
        </footer>
    )
}
export { Footer };