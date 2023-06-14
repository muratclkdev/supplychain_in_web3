import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function UpdateProductForm({ onUpdateProduct }) {
  const [productId, setProductId] = useState("");
  const [situation, setSituation] = useState("fabrikada");

  const situations = {
    "fabrikada": 0,
    "işleniyor": 1,
    "rafta": 2
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct(productId, situations[situation]);
    setProductId("");
    setSituation("fabrikada");
  };

  return (
    <Form onSubmit={handleSubmit}>
      
      <Form.Group controlId="formProductId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formSituation">
        <Form.Label>Situation</Form.Label>
        <Form.Select
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        >
          <option value="fabrikada">Fabrikada</option>
          <option value="işleniyor">İşleniyor</option>
          <option value="rafta">Rafta</option>
        </Form.Select>
      </Form.Group>
      <br/>
      <Button variant="primary" type="submit">Update Product</Button>
    </Form>
  );
}

export default UpdateProductForm;
