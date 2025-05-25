import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import MetaMaskIcon from "../../public/MetaMaskIcon.png";

interface UserAuthData {
    login?: string;
    pass?: string;
}

interface LoginResponse {
    data: {
        accessToken: string;
        [key: string]: any;
    };
}

export default function Login() {
    const navigate = useNavigate();
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
    const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);

    useEffect(() => {
        if ((window as any).ethereum) {

            setIsMetamaskInstalled(true);
        }
    }, []);

    async function connectMetamaskWallet(): Promise<void> {
        (window as any).ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then((accounts: string[]) => {
                setEthereumAccount(accounts[0]);

                navigate('/');
            })
            .catch((error: any) => {
                alert(`Something went wrong: ${error}`);
            });
    }


    return (
        <div className="form login">
            <span className="title">Login</span>
            <div className="input-field button">
                <button
                    type="button"
                    id="loginButton"
                    className="login-with-metamask"
                    onClick={connectMetamaskWallet}
                >
                    <span>Login with MetaMask</span>
                    <img
                        src={MetaMaskIcon}
                        alt="MetaMask Logo"
                        className="metamask-icon"
                    />
                </button>
            </div>
        </div>
    );
}