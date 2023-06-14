import React, { useState } from "react";

const statusToString = (status) => {
  switch(status) {
    case '0': return 'Manufacturing';
    case '1': return 'Processing';
    case '2': return 'OnShelf';
    default: return 'Unknown';
  }
}

function ProductTable({ contract }) {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  const handleIdChange = (e) => {
    setProductId(e.target.value);
  }

  const handleSearch = async () => {
    if (contract) {
      const result = await contract.methods.getProduct(productId).call();
      setProduct({
        id: result[0],
        name: result[1],
        description: result[2],
        situation: statusToString(result[3]),
        timestamp: new Date(result[4] * 1000).toLocaleString(),
      });
    }
  }

  return (
    <div>
      <h2>Product Search</h2>
      <input
        type="text"
        placeholder="Enter product ID"
        value={productId}
        onChange={handleIdChange}
      />
      <button onClick={handleSearch}>Search</button>
      {product && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Situation</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.situation}</td>
              <td>{product.timestamp}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductTable;
