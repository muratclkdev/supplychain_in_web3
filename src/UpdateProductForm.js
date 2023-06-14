import React, { useState } from "react";

function UpdateProductForm({ onUpdateProduct }) {
  const [productId, setProductId] = useState("");
  const [situation, setSituation] = useState("fabrikada");

  const situations = {
    "fabrikada": 0,
    "işleniyor": 1,
    "rafta": 2
  };

  const updateProduct = (e) => {
    e.preventDefault();
    onUpdateProduct(productId, situations[situation]);
    setProductId("");
    setSituation("fabrikada");
  };

  return (
    <form onSubmit={updateProduct}>
      <h2>Update Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <select
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
      >
        <option value="fabrikada">Fabrikada</option>
        <option value="işleniyor">İşleniyor</option>
        <option value="rafta">Rafta</option>
      </select>
      <button type="submit">Update Product</button>
    </form>
  );
}

export default UpdateProductForm;
