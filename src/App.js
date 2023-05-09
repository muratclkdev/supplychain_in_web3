import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "./contract-abi";
import CreateProductForm from "./CreateProductForm";

const CONTRACT_ADDRESS = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B"; // Akıllı kontratınızın adresini buraya yazın

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

      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the connected account
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // Create the contract instance using the ABI and the contract address
        const contractInstance = new web3Instance.eth.Contract(contractABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
      } catch (error) {
        alert("Ethereum'a bağlanırken hata oluştu.");
      }
    } else {
      alert("Ethereum tarayıcı eklentisi bulunamadı. MetaMask'i yüklemeyi düşünün.");
    }
  };

  const createProduct = async (name, description) => {
    if (!contract) {
      alert("Akıllı kontrat yüklenemedi.");
      return;
    }

    try {
      // Akıllı kontrat işlevini çağır ve işlemi onaylamak için MetaMask'i kullan
      const result = await contract.methods.createProduct(name, description).send({ from: account });

      // İşlem başarılı olduğunda, işlem sonucunu kullanarak uygulamanızı güncelleyin
      console.log("Product created:", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h1>Supply Chain App</h1>
      {account && <p>Connected Account: {account}</p>}
      <CreateProductForm onCreateProduct={createProduct} />
    </div>
  );
}

export default App;
