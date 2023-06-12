import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h2>Create a new product</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={situation} onChange={(e) => setSituation(e.target.value)}>
        <option value="fabrikada">Fabrikada</option>
        <option value="işleniyor">İşleniyor</option>
        <option value="rafta">Rafta</option>
      </select>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProductForm;
