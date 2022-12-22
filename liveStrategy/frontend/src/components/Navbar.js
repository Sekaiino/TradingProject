import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    return (
        <header className="app-header">
            <nav>
                <img src={require('../images/logo2.png')} alt="logo" />
                <ul className='menu'>
                    <li><HashLink to="/#">Home</HashLink></li>
                    <li><HashLink to="/trade#">Trades</HashLink></li>
                    <li><HashLink to="/project_details#">Project details</HashLink></li>
                    <li><HashLink to="/parameter#">Parameters</HashLink></li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar;