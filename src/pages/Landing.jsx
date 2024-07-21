import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from "web3"
import { useMetaMask } from '../components/MetaMaskProvider';
import Navbar from '../components/Navbar';
const Landing = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [ethBalance, setEthBalance] = useState("");
    const { account, setAccount } = useMetaMask();
    const [isConnected, setIsConnected] = useState(false);

    
    // Check if the browser has Metamask installed 
const detectCurrentProvider = () => {
    let provider;
    //metamask inject this window.ethereum method into the browser environment
    if (window.ethereum) {     
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
      alert('Please install MetaMask to use this feature');
    }
    return provider;
  };

//to fetch all the details of the current wallet 
  const ConnectWallet=async()=>{
    try {
        const currentProvider = detectCurrentProvider();
        if(currentProvider) {
          await currentProvider.request({method: 'eth_requestAccounts'});
          const web3 = new Web3(currentProvider);
          const userAccount  =await web3.eth.getAccounts();
        //   fetching the current wallet adress information 
          const account = userAccount[0];
          console.log("account",account);
          //fetching the balance of the current wallet
          // let ethBalance = await web3.eth.getBalance(account);
          let balanceInWei = await web3.eth.getBalance(account);
        let balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
          setEthBalance(balanceInEth);
          setAccount(account); 
          console.log("your balance",ethBalance)
          console.log("account details",account)
          setIsConnected(true);
          console.log("option while logging",selectedOption)
           
         
        }
      } catch(err) {
        console.log(err);
        
      }
  
  }
  const loginfunction = () => {
    console.log(isConnected);
    if (isConnected) {
      if (selectedOption === "client") {
        // Navigate to client side
        navigate("/clientHome");
      } else if (selectedOption === "freelancer") {
        // Navigate to freelancer side
        navigate("/freelancer");
      }
    } else {
      alert("Please connect your wallet first!");
    }
  };
  

  
  const handleOptionChange = (event) => {
    console.log("HANDLE OPTION CHANGE called");
    setSelectedOption(event.target.value);
    console.log("checked",event.target.checked)
    console.log("value",event.target.value)
    
  };










  return (
    <>
    <Navbar account={account} balance={ethBalance} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">Join as a client or freelancer</h1>
      <div className="flex space-x-8">
        <label className="flex flex-col items-center bg-white p-8 rounded shadow-lg">
          <input
            type="radio"
            name="userType"
            value="client"
            checked={selectedOption === 'client'}
            onChange={handleOptionChange}
            className="mb-4"
          />
          <span className="font-semibold">I'm a client, hiring for a project</span>
        </label>
        <label className="flex flex-col items-center bg-white p-8 rounded shadow-lg">
          <input
            type="radio"
            name="userType"
            value="freelancer"
            checked={selectedOption === 'freelancer'}
            onChange={handleOptionChange}
            className="mb-4"
          />
          <span className="font-semibold">I'm a freelancer, looking for work</span>
        </label>
      </div>
      <button onClick={ConnectWallet}
        className="mt-8 bg-gray-300 text-gray-600 py-2 px-6 rounded disabled:opacity-50"
      >
         Connect Wallet
      </button>
      <button onClick={loginfunction}
        className="mt-8 bg-gray-300 text-gray-600 py-2 px-6 rounded disabled:opacity-50"
      >
        Login
      </button>
      {/* {isConnected &&   <div className="fixed top-4 center bg-white p-4 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-2">Wallet Info</h2>
      <p><strong>Account:</strong> {account}</p>
      <p><strong>Balance:</strong> {ethBalance} ETH</p>
    </div>
   } */}
    </div>
    </>  );
};

export default Landing;
