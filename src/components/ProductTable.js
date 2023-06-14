import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const statusToString = (status) => {
  switch (status) {
    case '0':
      return 'Fabrikada';
    case '1':
      return 'İşleniyor';
    case '2':
      return "Rafta";
    default:
      return 'Unknown';
  }
}

function ProductTable({ contract }) {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleIdChange = (e) => {
    setProductId(e.target.value);
  }

  const handleSearch = async () => {
    if (contract) {
      const result = await contract.methods.getProduct(productId).call();
      const name = result[1];
      const description = result[2];
      if (name && description) {
        setProduct({
          id: result[0],
          name,
          description,
          situation: statusToString(result[3]),
          timestamp: new Date(result[4] * 1000).toLocaleString(),
        });
        setErrorMessage("");
      } else {
        setProduct(null);
        setErrorMessage("Hatalı ID girişi. Lütfen tekrar deneyin.");
      }
    }
  }

  return (
    <Card className="p-4">
      <Form>
        <Form.Group controlId="formProductId">
          <br/>
          <Form.Control
            type="text"
            placeholder="Ürün ID girin."
            value={productId}
            onChange={handleIdChange}
          />
        </Form.Group>
        <br/>
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Form>
      <br/>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {product && (
        <div className="mt-4">
          <h4>Ürün Detayları</h4>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>İsim:</strong> {product.name}</p>
          <p><strong>Açıklama:</strong> {product.description}</p>
          <p><strong>Durum:</strong> {product.situation}</p>
          <p><strong>Ürün Oluşturma Saati:</strong> {product.timestamp}</p>
        </div>
      )}
    </Card>
  );
}

export default ProductTable;
