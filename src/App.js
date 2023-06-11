import React, { useState, useEffect } from "react";
import Web3 from "web3";
import contractABI from "./contract-abi";
import CreateProductForm from "./CreateProductForm";

const CONTRACT_ADDRESS = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [isCompanySet, setIsCompanySet] = useState(false);

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
      const result = await contract.methods.createProduct(name, description).send({ from: account });
      console.log("Product created:", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCompanySubmit = () => {
    if (companyName) {
      if (!account) {
        alert("Lütfen sayfayı yenileyip MetaMask hesabınızla tekrar girmeye çalışın.");
        return;
      }
      setIsCompanySet(true);
    }
  };

  return (
    <div>
      <h1>Supply Chain App</h1>
      {!isCompanySet ? (
        <div>
          <input
            type="text"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <button onClick={handleCompanySubmit}>Save</button>
        </div>
      ) : (
        <div>
          <p>Welcome {companyName}! Connected Account: {account}</p>
          <CreateProductForm onCreateProduct={createProduct} />
        </div>
      )}
    </div>
  );
}

export default App;
