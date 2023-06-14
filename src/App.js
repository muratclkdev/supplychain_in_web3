import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "./contract-abi";
import CreateProductForm from "./CreateProductForm";
import UpdateProductForm from "./UpdateProductForm"; // Yeni bileşeni import edin
import ProductTable from "./ProductTable";

const CONTRACT_ADDRESS = "0xBcC538D26c439e03F37939C7a56502CF8C870416";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      const contractInstance = new web3Instance.eth.Contract(contractABI, CONTRACT_ADDRESS);
      setContract(contractInstance);
    } else {
      alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
    }
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

  // updateProduct fonksiyonunu oluşturun
  const updateProduct = async (productId, situation) => {
    if (!contract) {
      alert("Akıllı kontrat yüklenemedi.");
      return;
    }

    try {
      const result = await contract.methods
        .updateProductStatus(productId, situation)
        .send({ from: account });

      console.log("Product updated:", result);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ...

  return (
    <div>
      <h1>Supply Chain App</h1>
      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
      <CreateProductForm onCreateProduct={createProduct} />
      <UpdateProductForm onUpdateProduct={updateProduct} /> /* updateProduct fonksiyonunu bileşene ilettik */}
      <ProductTable contract={contract} />
    </div>
  );
}

export default App;
