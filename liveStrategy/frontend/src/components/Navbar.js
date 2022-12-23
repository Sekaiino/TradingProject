import { HashLink } from 'react-router-hash-link';
import { MdOutlineMenu } from 'react-icons/md';

const Navbar = () => {

    const style = {width: "100%", height: "100%"};

    return (
        <header className="app-header">
            <nav>
                <img src={require('../images/logo2.png')} alt="logo" />
                <label htmlFor="toggler"><MdOutlineMenu style={style} /></label>
                <input type="checkbox" id='toggler' />
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