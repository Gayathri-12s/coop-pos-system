function ProductCard({
  product,
  onAddToCart
}) {

  return (

    <div
      className="card shadow-sm h-100"
      onClick={() => onAddToCart(product)}
      style={{
        cursor: 'pointer'
      }}
    >

      <div className="card-body">

        <h4 className="card-title">
          {product.name}
        </h4>

        <h5 className="text-success">
          AED {product.price}
        </h5>

        <p className="mb-2">
          <strong>Category:</strong>
          {' '}
          {product.category}
        </p>

        <p className="mb-0">
          <strong>Stock:</strong>
          {' '}
          {product.stock_quantity}
        </p>

      </div>

    </div>

  )
}

export default ProductCard