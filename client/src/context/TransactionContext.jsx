import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import {contractABI, contractAddress } from "../utils/constants";

export const transactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = ()=> {
    const provider = new ethers.providers.Web3provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;

}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount:"", keyword:"", message:""});

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask!");

        const accounts = await ethereum.request({ method: "eth_accounts"});

        if(accounts.length) {
            setCurrentAccount(accounts[0]);


        } else {
            console.log("No accounts found");
        }
            
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
            
        }
        
        
        console.log(accounts);
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask!");

            const accounts = await ethereum.request({ method: "eth_requestAccounts"});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }

    }

    const sendTransaction = async ()=> {
        try {
            if(!ethereum) return alert("Please install Metamask!");

            //get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseether(amount);

            await ethereumm.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208", //21000 gwei
                    value: amount,
                }]
            })
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
            
        }

    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );

}