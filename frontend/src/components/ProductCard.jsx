function ProductCard({
  product,
  onAddToCart
}) {

  return (
    <div
     onClick={() => onAddToCart(product)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
      }}
    >
      <h3>{product.name}</h3>

      <p>
        AED {product.price}
      </p>

      <p>
        Category: {product.category}
      </p>

      <p>
        Stock: {product.stock_quantity}
      </p>
    </div>
  )
}

export default ProductCard