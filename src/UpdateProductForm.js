import React, { useState } from 'react';

function UpdateProductForm({ onUpdateProduct }) {
  const [productId, setProductId] = useState('');
  const [situation, setSituation] = useState('');

  const situations = ["Fabrikada", "İşleniyor", "Rafta"];
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateProduct(productId, situation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>
      <div>
        <label>Product ID</label>
        <input type="number" value={productId} onChange={e => setProductId(e.target.value)} />
      </div>
      <div>
        <label>New Situation</label>
        <select value={situation} onChange={e => setSituation(e.target.value)}>
        
          {situations.map((situation, index) => (
            <option key={index} value={situation}>{situation}</option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default UpdateProductForm;
