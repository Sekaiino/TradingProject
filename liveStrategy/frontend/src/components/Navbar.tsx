import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="app-header">
            <nav>
                <img src={require('../images/logo.png')} alt="logo" />
                <ul className='menu'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="">Trades</Link></li>
                    <li><Link to="">Project details</Link></li>
                    <li><Link to="">Parameters</Link></li>
                </ul>
            </nav>
        </header>
    )
}
export { Navbar };