import axios from 'axios';
import { apiUrl } from '../../config';
import { ethers } from 'ethers';


export const postSignup = async (name: string, email: string, address: string) => {
    try {
        const nonceResponse = await axios.post(`${apiUrl}/nonce`, {
            address: address,
        });

        const nonce = nonceResponse.data?.nonce;

        if (!nonce) {
            throw new Error('Nonce not received');
        }

        if (!window.ethereum) {
            throw new Error('MetaMask not available');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signature = await signer.signMessage(nonce);

        const signupResponse = await axios.post(`${apiUrl}/signup`, {
            name: name,
            email: email,
            address: address,
            signature: signature,
        });

        const data = signupResponse.data;

        return {
            accessToken: data?.accessToken || null,
            refreshToken: data?.refreshToken || null,
        };
    } catch (error) {
        console.error('Error during signup:', error);

        return {
            accessToken: null,
            refreshToken: null,
        };
    }
};