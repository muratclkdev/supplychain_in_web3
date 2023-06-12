import React, { useEffect, useState } from "react";

function ProductTable({ contract, account }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [contract, account]);

  const fetchProducts = async () => {
    if (!contract || !account) {
      return;
    }

    try {
      const productCount = await contract.methods.productIDs(account).call();
      const productList = [];

      for (let i = 0; i < productCount; i++) {
        const product = await contract.methods.getProduct(account, i).call();
        productList.push(product);
      }

      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h2>Your Products</h2>
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
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.situation}</td>
              <td>{new Date(product.timestamp * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
