import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
    return (
        <div className="navbar">
            <div className="flex logo">
                <img src={logo} alt="" />
                <p>Product showcase</p>
            </div>
            <div className="flex navbar-menu">
                <div className="flex highlight-btn">
                    <FontAwesomeIcon icon={faUser}/>
                    <p>Login</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar