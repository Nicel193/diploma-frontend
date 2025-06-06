import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/slices/AuthSlice';
import type { AppDispatch } from '../store/Store';

// UI
import { FaUserAlt, FaEnvelope } from 'react-icons/fa';
import MetaMaskIcon from "../../public/MetaMaskIcon.png";

interface User {
    login?: string;
    fullName?: string;
    email?: string;
    pass?: string;
}

const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<User>({});
    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
        setUser(prev => ({ ...prev, [field]: e.target.value }));
    };

    const onSignup = async () => {
        try {
            if (!window.ethereum) {
                setError('MetaMask is not installed');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];

            if (!user.fullName || !user.email) {
                setError("Please fill in all required fields.");
                return;
            }

            await dispatch(signup({
                name: user.fullName,
                email: user.email,
                address,
            })).unwrap();

        } catch (err: any) {
            setError(`Registration failed: ${err.message}`);
        }
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
                    onClick={onSignup}>
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