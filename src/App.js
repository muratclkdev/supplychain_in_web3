import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "./contract-abi";
import CreateProductForm from "./CreateProductForm";
import ProductTable from "./ProductTable";

const CONTRACT_ADDRESS = "0x922A0774eE4049355C0C44A9b549af8864F04075"; 

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        const contractInstance = new web3Instance.eth.Contract(contractABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
      } catch (error) {
        alert("Error while connecting to Ethereum.");
      }
    } else {
      alert("Couldn't detect Ethereum browser extension. Consider installing MetaMask.");
    }
  };

  const createProduct = async (name, description, situation) => {
    if (!contract) {
      alert("Smart contract not loaded.");
      return;
    }

    try {
      const result = await contract.methods.createProduct(name, description, situation).send({ from: account });
      console.log("Product created:", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleSubmitCompany = (event) => {
    event.preventDefault();
    if (!web3) {
      alert("Please reload the page and connect your MetaMask account.");
      return;
    }
    setHasSubmitted(true);
  };

  return (
    <div>
      <h1>{hasSubmitted ? `Welcome ${companyName}!` : "Supply Chain App"}</h1>
      {hasSubmitted ? (
        <div>
          <p>Connected Account: {account}</p>
          <CreateProductForm onCreateProduct={createProduct} />
          <ProductTable contract={contract} account={account} />
        </div>
      ) : (
        <form onSubmit={handleSubmitCompany}>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default App;
