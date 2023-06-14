import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Container, Card, Button, Accordion, Badge } from "react-bootstrap";
import contractABI from "./contract-abi";
import CreateProductForm from "./CreateProductForm";
import UpdateProductForm from "./UpdateProductForm";
import ProductTable from "./ProductTable";
import './App.css';

const CONTRACT_ADDRESS = "0xf6897569e40163e8724eb5442a0a7ab95fa0c37a";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initWeb3();
  }, []);
  const situations = {
    "fabrikada": 0,
    "işleniyor": 1,
    "rafta": 2
  };
  
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

  const connectWallet = async () => {
    const accounts = await window.ethereum.enable();
    setAccount(accounts[0]);
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
  
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="p-5"
        style={{ width: "400px", background: "rgba(255, 255, 255, 0.8)" }}
      >
        <h2 className="text-center mb-4">TEDARİK ZİNCİRİ DAPP</h2>
        {!account ? (
          <>
            <Button className="mt-4" variant="primary" onClick={connectWallet}>
              Connect Wallet
            </Button>
            <footer className="mt-4 text-center">
              <small>© 2023 Murat Çelik Tüm hakları saklıdır</small>
            </footer>
          </>
        ) : (
          <>
            <Badge variant="secondary">
              Hesap Adresiniz:{" "}
              {account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : "Loading..."}
            </Badge>
            <Accordion defaultActiveKey="0" className="mt-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ürün Ekle</Accordion.Header>
                <Accordion.Body>
                  <CreateProductForm onCreateProduct={createProduct} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Ürün Durumu Güncelle</Accordion.Header>
                <Accordion.Body>
                  <UpdateProductForm onUpdateProduct={updateProduct} />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Ürün İncele</Accordion.Header>
                <Accordion.Body>
                  <ProductTable contract={contract} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <p className="text-center mt-4">
              <a
                href={`https://mumbai.polygonscan.com/address/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="custom-link"
              >
                Zincirde İncele
              </a>
            </p>
            <footer className="mt-4 text-center">
              <small>© 2023 Murat Çelik Tüm hakları saklıdır</small>
            </footer>
          </>
        )}
      </Card>
    </Container>
  );
}

export default App;
