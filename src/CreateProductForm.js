import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function CreateProductForm({ onCreateProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [situation, setSituation] = useState("fabrikada");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProduct(name, description, situation);
    setName("");
    setDescription("");
    setSituation("fabrikada");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSituation">
        <Form.Label>Situation</Form.Label>
        <Form.Select value={situation} onChange={(e) => setSituation(e.target.value)} className="pb-1">
          <option value="fabrikada">Fabrikada</option>
          <option value="işleniyor">İşleniyor</option>
          <option value="rafta">Rafta</option>
        </Form.Select>
        <br/>
      </Form.Group>
      <Button variant="primary" type="submit" className="button">Create Product</Button>
    </Form>
  );
}

export default CreateProductForm;
