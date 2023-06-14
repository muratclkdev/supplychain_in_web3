import React, { useState } from "react";
import Web3 from "web3";
import contractABI from "./contract-abi";
import CreateProductForm from "./CreateProductForm";
import ProductTable from "./ProductTable";
import UpdateProductForm from './UpdateProductForm';

const CONTRACT_ADDRESS = "0xBcC538D26c439e03F37939C7a56502CF8C870416";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        initWeb3();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
    }
  };
  const updateProduct = async (id, situation) => {
    if (!contract) {
      alert("Akıllı kontrat yüklenemedi.");
      return;
    }
  
    try {
      const result = await contract.methods
        .updateProductStatus(id, situations[situation])
        .send({ from: account });
  
      console.log("Product updated:", result);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const initWeb3 = async () => {
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
    const accounts = await web3Instance.eth.getAccounts();
    setAccount(accounts[0]);
    const contractInstance = new web3Instance.eth.Contract(contractABI, CONTRACT_ADDRESS);
    setContract(contractInstance);
    setIsConnected(true);
  };

  const situations = {
    "fabrikada": 0,
    "işleniyor": 1,
    "rafta": 2
  };

  const createProduct = async (name, description, situation) => {
    if (!contract) {
      alert("Akıllı kontrat yüklenemedi.");
      return;
    }

    try {
      const result = await contract.methods
        .createProduct(name, description, situations[situation])
        .send({ from: account });

      console.log("Product created:", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h1>Supply Chain App</h1>
      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <h2>Connected Account: {account}</h2>
          <CreateProductForm onCreateProduct={createProduct} />
          <ProductTable contract={contract} />
          <UpdateProductForm onUpdateProduct={updateProduct} />
        </>
      )}
    </div>
  );
}

export default App;
