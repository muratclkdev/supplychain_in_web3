import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const statusToString = (status) => {
  switch (status) {
    case '0':
      return 'Manufacturing';
    case '1':
      return 'Processing';
    case '2':
      return 'OnShelf';
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
          <Form.Label><strong>Enter product ID</strong></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={handleIdChange}
          />
        </Form.Group>
        <br/>
        <Button variant="primary" onClick={handleSearch}>Search</Button>
      </Form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {product && (
        <div className="mt-4">
          <h4>Product Details</h4>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Situation:</strong> {product.situation}</p>
          <p><strong>Timestamp:</strong> {product.timestamp}</p>
        </div>
      )}
    </Card>
  );
}

export default ProductTable;
