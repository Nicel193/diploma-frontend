import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope} from 'react-icons/fa';
import MetaMaskIcon from "../../public/MetaMaskIcon.png";

interface User {
    login?: string;
    fullName?: string;
    email?: string;
    pass?: string;
}

const Register: React.FC = () => {
    const [user, setUser] = useState<User>({});
    const [additionalPassword, setAdditionalPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
        setUser(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="form signup">
            <span className="title">Registration</span>
            {error && <div className="error-message">{error}</div>}
            <form>
                <div className="input-field">
                    <input
                        type="text"
                        id="login"
                        placeholder="Enter your login"
                        onChange={(e) => handleInputChange(e, 'login')}
                        required
                    />
                    <FaUserAlt className="uil" />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        onChange={(e) => handleInputChange(e, 'fullName')}
                        required
                    />
                    <FaUserAlt className="uil" />
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={(e) => handleInputChange(e, 'email')}
                        required
                    />
                    <FaEnvelope className="uil uil-envelope icon" />
                </div>
                <br />
                <button
                    type="button"
                    id="loginButton"
                    className="login-with-metamask"
                    // onClick={loginUser}
                >
                    <span>Register with MetaMask</span>
                    <img
                        src={MetaMaskIcon}
                        alt="MetaMask Logo"
                        className="metamask-icon"
                    />
                </button>
            </form>
        </div>
    );
};

export default Register;