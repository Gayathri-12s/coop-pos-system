import { useEffect, useState } from 'react'

import api from '../api/api'
import ProductCard from '../components/ProductCard'

function POSPage() {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('')
  const [saleData, setSaleData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchProducts()
  }, []) 

  const fetchProducts = async () => {

    try {

      const response = await api.get('products/')

      setProducts(response.data)

    } catch (error) {

      console.error(error)
    }
  }
  const addToCart = (product) => {

  const existingItem = cart.find(
    item => item.id === product.id
  )

  if (existingItem) {

    const updatedCart = cart.map(item =>

      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + 1
          }
        : item
    )

    setCart(updatedCart)

  } else {

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ])
  }
}
const increaseQuantity = (productId) => {

  const updatedCart = cart.map(item =>

    item.id === productId
      ? {
          ...item,
          quantity: item.quantity + 1
        }
      : item
  )

  setCart(updatedCart)
}

const decreaseQuantity = (productId) => {

  const updatedCart = cart
    .map(item =>

      item.id === productId
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item
    )
    .filter(item => item.quantity > 0)

  setCart(updatedCart)
}

const removeFromCart = (productId) => {

  const updatedCart = cart.filter(
    item => item.id !== productId
  )

  setCart(updatedCart)
}
const subtotal = cart.reduce(
    

  (total, item) =>

    total + (item.price * item.quantity),

  0
)
const vatAmount = subtotal * 0.05

const grandTotal = subtotal + vatAmount
const filteredProducts = products.filter(

  product => {

    const matchesSearch =

      product.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    const matchesCategory =

      selectedCategory === 'All'
        ? true
        : product.category === selectedCategory

    return (
      matchesSearch &&
      matchesCategory
    )
  }

)
const handleCheckout = async () => {

  const token = localStorage.getItem(
    'access_token'
  )
console.log('TOKEN:', token)
  try {

    const response = await api.post(

      'sales/create/',

      {
        payment_method: paymentMethod,

        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
        }))
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(response.data)
    setSaleData(response.data)
    alert('Sale completed successfully')

  } catch (error) {

  console.error(error)

  console.log(
    'ERROR RESPONSE:',
    error.response?.data
  )

  alert('Checkout failed')
}
}
if (saleData) {

  return (

  <div className="container mt-5">

    <div className="card shadow p-4 mx-auto"
         style={{ maxWidth: '500px' }}>

     <h2 className="text-center">
   SUPERMARKET
</h2>

<p className="text-center text-muted">
  Abu Dhabi, UAE
</p>

      <hr />

      <h2>
        {saleData.formatted_sale_id}
      </h2>

      <hr />

      <p>
        Payment:
        {' '}
        {saleData.payment_method}
      </p>

      <p>
        Subtotal:
        {' '}
        AED {saleData.subtotal}
      </p>

      <p>
        VAT:
        {' '}
        AED {saleData.vat_amount}
      </p>

    <h3 className="text-success text-center">
  AED {saleData.total}
</h3>

      <hr />

      <p>
        Thank You For Shopping
      </p>
      <button
        className="btn btn-primary w-100"
  onClick={() => {

    setSaleData(null)

    setCart([])

    setPaymentMethod('')
  }}
>
  New Sale
</button>

    </div>
    </div>
  )
}
  return (
   <div className="container-fluid p-4">

    <h1 className="bg-dark text-white p-3 rounded mb-4 text-center">
  COOP POS SYSTEM
</h1>
   <input
  className="form-control mb-3"
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
/>
<div>

  <button
    className="btn btn-outline-primary me-2 mb-2"
    onClick={() =>
      setSelectedCategory('All')
    }
  >
    All
  </button>

  <button
    className="btn btn-outline-primary me-2 mb-2"
    onClick={() =>
      setSelectedCategory('Grocery')
    }
  >
    Grocery
  </button>

  <button
  className="btn btn-outline-primary me-2 mb-2"
    onClick={() =>
      setSelectedCategory('Dairy')
    }
  >
    Dairy
  </button>

  <button
  className="btn btn-outline-primary me-2 mb-2"
    onClick={() =>
      setSelectedCategory('Produce')
    }
  >
    Produce
  </button>

  <button
  className="btn btn-outline-primary me-2 mb-2"
    onClick={() =>
      setSelectedCategory('Beverages')
    }
  >
    Beverages
  </button>

  <button
  className="btn btn-outline-primary me-2 mb-2"
    onClick={() =>
      setSelectedCategory('Snacks')
    }
  >
    Snacks
  </button>

</div>
<div className="row">

  <div className="col-md-8">
    <h3 className="mb-3">
  Products
</h3>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
      }}
    >

      {filteredProducts.map((product) => (

        <ProductCard
        
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />

      ))}

    </div>

  </div>

<div className="col-md-4">

  <div className="card shadow p-3">

    <h3 className="mb-3">
      🛒 Shopping Cart
    </h3>

{cart.map(item => (

 <div
  key={item.id}
  className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded"
>

  <div>
    <strong>{item.name}</strong>
    <br />
    Qty: {item.quantity} | AED {item.price}
  </div>

  <div>

    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() =>
        decreaseQuantity(item.id)
      }
    >
      -
    </button>

    <button
      className="btn btn-sm btn-outline-success mx-1"
      onClick={() =>
        increaseQuantity(item.id)
      }
    >
      +
    </button>

    <button
      className="btn btn-sm btn-danger"
      onClick={() =>
        removeFromCart(item.id)
      }
    >
      Remove
    </button>

  </div>

</div>

))}
<hr />



<div className="mt-3">

  <p>
    <strong>Subtotal:</strong>
    {' '}
    AED {subtotal.toFixed(2)}
  </p>

  <p>
    <strong>VAT (5%):</strong>
    {' '}
    AED {vatAmount.toFixed(2)}
  </p>

  <h4 className="text-success">
    Total: AED {grandTotal.toFixed(2)}
  </h4>

</div>
<div className="mt-4">

<h3>Payment Method</h3>

<label>
  <input
    type="radio"
    value="Cash"
    checked={paymentMethod === 'Cash'}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
  />
  Cash
</label>

<br />

<label>
  <input
    type="radio"
    value="Card"
    checked={paymentMethod === 'Card'}
    onChange={(e) =>
      setPaymentMethod(e.target.value)
    }
  />
  Card
</label>
</div>
<br />
<br />


<button

  className="btn btn-success w-100"

  onClick={handleCheckout}
  disabled={
    cart.length === 0 ||
    !paymentMethod
  }
>
  Checkout
</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default POSPage