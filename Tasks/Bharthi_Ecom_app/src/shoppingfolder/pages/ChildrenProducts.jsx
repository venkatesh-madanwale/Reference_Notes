import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChildrenProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Assuming your JSON file is placed in the public folder
    fetch('/children-products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to load children products", err));
  }, []);

  return (
    <>
      <Header/>
    <div className="children-products">
      <h2>Children's Collection</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Size:</strong> {product.size.join(', ')}</p>
              <p><strong>Color:</strong> {product.color}</p>
              <p><strong>In Stock:</strong> {product.inStock ? 'Yes' : 'No'}</p>
            </div>
          ))
        ) : (
          <p>Loading children products...</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ChildrenProducts;
