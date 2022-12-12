import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="app-header">
            <nav>
                <img src={require('../images/logo2.png')} alt="logo" />
                <ul className='menu'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/trade">Trades</Link></li>
                    <li><Link to="/project_details">Project details</Link></li>
                    <li><Link to="/parameter">Parameters</Link></li>
                </ul>
            </nav>
        </header>
    )
}
export { Navbar };