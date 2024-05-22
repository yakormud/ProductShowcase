import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react'
import logo from './assets/mylogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './Login.jsx';
import AuthContext, { AuthProvider } from './AuthContext';
import { getPayload } from './isAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    var user;
    if (auth) {
        user = getPayload();
    }
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove token from sessionStorage
        delete axios.defaults.headers.common["Authorization"];
        setAuth(false);
        navigate('/');
    };
    return (
        <div className="mynavbar">
            <div className="flex logo">
                <img src={logo} alt="" />
                <p>Product showcase</p>
            </div>
            <div className="flex mynavbar-menu">
                {auth ? (
                    <>
                    <div>
                        <p>Welcome, {user.firstname} {user.lastname}</p>
                    </div>
                    <div className="flex highlight-btn" onClick={() => handleLogout()}>
                        <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                        <p>Logout</p>
                    </div>
                    </>

                ) : (
                    <div>
                        <div className="flex highlight-btn" data-bs-toggle="modal" data-bs-target="#loginModal">
                            <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                            <p>Login</p>
                        </div>

                        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <Login />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navbar